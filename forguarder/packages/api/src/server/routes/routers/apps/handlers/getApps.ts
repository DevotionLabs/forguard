import { AppsSettings } from "../../../../../appSettingsEngine/schemas.js";

export const getAppsHandler = async (): Promise<AppsSettings> => {
	// TODO: Do things with input

	return {
		exampleApp: {
			exampleService: {
				vpn: { exposed: true, aliases: ["exampleAlias"] },
				https: { exposed: true, mappings: [{ subdomain: "example", servicePort: 443 }] }
			}
		}
	};
};
