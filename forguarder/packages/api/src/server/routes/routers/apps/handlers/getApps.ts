import { ExposureSettings } from "../../../../../appExposer/index.js";

export const handleGetApps = async (): Promise<ExposureSettings> => {
	// TODO: Do things with input

	return {
		apps: {
			exampleApp: {
				exampleService: {
					https: true,
					wireguard: true
				}
			}
		},
		mappings: {
			"example.mydomain.com": {
				app: "exampleApp",
				service: "exampleService",
				port: 80,
				protocol: "http"
			}
		}
	};
};
