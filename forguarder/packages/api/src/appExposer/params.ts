export const wireguardParams = {
	serviceName: "wireguard",
	networkName: "wg_network"
};

export const httpsParams = {
	serviceName: "https-portal",
	domainsEnvName: "DOMAINS",
	networkName: "https_network"
};

export const targetProtocols = ["http", "https"] as const;
