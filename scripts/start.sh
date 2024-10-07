#!/bin/bash

# Define variables
WG_NETWORK_NAME=wg_network
WG_NETWORK_SUBNET=172.16.0.128/26

# Function to log messages with levels (INFO, WARN, ERROR)
log() {
    level=$1
    message=$2
    timestamp=$(date +'%Y-%m-%d %H:%M:%S')
    log_message="$timestamp - $level - $message"
    
    # Log to console
    case $level in
        INFO) echo -e "\033[32m$log_message\033[0m" ;;   # Green for INFO
        WARN) echo -e "\033[33m$log_message\033[0m" ;;   # Yellow for WARN
        ERROR) echo -e "\033[31m$log_message\033[0m" ;;  # Red for ERROR
        *) echo "$log_message" ;;
    esac
}

# 1. Check if the required packages are installed
log "INFO" "Checking for required packages (docker, jq, docker-compose)..."

if ! command -v docker &> /dev/null; then
    log "ERROR" "Docker is not installed. Exiting."
    exit 1
fi

if ! command -v jq &> /dev/null; then
    log "ERROR" "jq is not installed. Exiting."
    exit 1
fi

if ! docker compose version &> /dev/null; then
    log "ERROR" "Docker Compose Plugin is not installed. Exiting."
    exit 1
fi

log "INFO" "All required packages are installed."

# 2. Check if the network exists
log "INFO" "Checking if Docker network '$WG_NETWORK_NAME' exists..."
found_network=$(docker network ls --filter name=^${WG_NETWORK_NAME}$ --format "{{.Name}}")

if [ "$found_network" ]; then
    log "INFO" "Docker network '$WG_NETWORK_NAME' exists."

    # 3. Check if the subnet is correct
    log "INFO" "Checking if the subnet is correct..."
    network_subnet=$(docker network inspect $WG_NETWORK_NAME | jq -r '.[0].IPAM.Config[0].Subnet')

    if [ "$network_subnet" == "$WG_NETWORK_SUBNET" ]; then
        log "INFO" "Subnet is correct. No changes needed."
    else
        log "WARN" "Incorrect subnet detected ($network_subnet). Recreating network with the correct subnet..."

        # Save the currently connected containers
        containers=$(docker network inspect $WG_NETWORK_NAME | jq -r '.[0].Containers[].Name')

        # Remove the existing network
        docker network rm $WG_NETWORK_NAME
        log "INFO" "Removed network '$WG_NETWORK_NAME'."

        # Recreate the network with the correct subnet
        docker network create --subnet=$WG_NETWORK_SUBNET $WG_NETWORK_NAME
        log "INFO" "Recreated network with subnet $WG_NETWORK_SUBNET."

        # Reconnect the previously connected containers
        for container in $containers; do
            log "INFO" "Reconnecting container '$container' to the new network..."
            docker network connect $WG_NETWORK_NAME "$container"
        done
    fi
else
    # 4. Create the network if it doesn't exist
    log "INFO" "Docker network '$WG_NETWORK_NAME' does not exist. Creating it with subnet $WG_NETWORK_SUBNET..."
    docker network create --subnet=$WG_NETWORK_SUBNET $WG_NETWORK_NAME
    log "INFO" "Network '$WG_NETWORK_NAME' created."
fi

# 5. Bring down any running containers
log "INFO" "Bringing down any running containers using docker compose..."
docker compose down
log "INFO" "Containers brought down."

# 6. Bring the containers back up
log "INFO" "Bringing up the containers in detached mode..."
docker compose up -d
log "INFO" "Containers started."

log "INFO" "WireGuard network setup completed successfully."
