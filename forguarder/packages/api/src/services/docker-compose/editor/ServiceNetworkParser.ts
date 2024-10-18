import { ListOfStrings } from "./generated/types.js";
import { RawServiceNetworks, ServiceNetworks } from "./types.js";

export class ServiceNetworkParser {
	public static normalize(networks: RawServiceNetworks): ServiceNetworks {
		if (!networks) return {};

		if (this.isListOfStrings(networks)) {
			return this.convertNetworkListToObject(networks);
		}

		return networks;
	}

	private static isListOfStrings(value: unknown): value is ListOfStrings {
		return Array.isArray(value) && value.every((item) => typeof item === "string");
	}

	private static convertNetworkListToObject(networkList: ListOfStrings): ServiceNetworks {
		const networkObject: Record<string, {}> = {};
		networkList.forEach((network) => {
			networkObject[network] = {};
		});
		return networkObject;
	}
}
