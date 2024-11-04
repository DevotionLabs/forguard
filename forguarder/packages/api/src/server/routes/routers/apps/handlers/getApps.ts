import { z } from "zod";
import { AppsDataSchema } from "../schemas.js";

export const getAppsHandler = async (): Promise<z.infer<typeof AppsDataSchema>> => {
	// TODO: Do things with input

	return {
		exampleApp: {
			exampleService: {
				vpn: { exposed: true, aliases: ["exampleAlias"] },
				https: { mappings: [{ exposed: true, subdomain: "example", servicePort: 443 }] }
			}
		}
	};
};
