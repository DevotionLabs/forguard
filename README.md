# ForGuard

ForGuard is a software application that helps manage your Docker services through an intuitive web UI. It leverages Docker Compose to run three main services:

1. **WireGuard** 🛡️  
   Provides a VPN server to allow secure access to your private Docker services.
   
2. **HTTPS-Portal** 🔒  
   Automatically handles HTTPS termination using Let's Encrypt to expose services securely.

3. **ForGuarder** 🖥️  
   A TypeScript-based monorepo (Node.js + React) that provides a web interface for managing and viewing the status of your Docker containers.

---

## 🚀 Features

- **WebUI-Controlled Container Management**:  
  From the web UI, users can add Docker containers from the host to a Docker network, enabling secure access via WireGuard.

- **HTTPS Access for Services**:  
  Easily share services provided by the containers with HTTPS, using HTTPS-Portal.

- **Real-Time Status Monitoring**:  
  Monitor the current state of your containers directly from the web interface.

---

## 📦 Services

1. **WireGuard**:  
   A secure VPN to connect peers to your Docker containers, allowing safe and restricted access.
   
   - Accessible containers are automatically added to the WireGuard network.
   
2. **HTTPS-Portal**:  
   Manages SSL certificates and exposes services over HTTPS.
   
   - Automatically provisions certificates for your services using Let's Encrypt.
   
3. **ForGuarder**:  
   A React + Node.js monorepo that handles the user interface and backend logic.  
   The web UI enables users to manage services and Docker containers with ease.

