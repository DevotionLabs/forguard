import { AppsSettings } from "../../../../../appExposer/types.js";

export const getAppsHandler = async (): Promise<AppsSettings> => {
	// TODO: Do things with input

	return {
		exampleApp: {
			exampleService: {
				vpn: { exposed: true, aliases: ["exampleAlias"] },
				https: { exposed: true, mappings: [{ domain: "example", servicePort: 443 }] }
			}
		}
	};
};
