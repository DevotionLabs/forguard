import { Logger } from "../../../logger/index";
import { ComposeEditor } from "./ComposeEditor";
import { PropertiesNetworks } from "./generated/types";

export class ComposeNetworkEditor extends ComposeEditor {
	constructor(path: string) {
		super(path);
	}

	public addExternalNetworkToRoot(networkName: string): void {
		const rootNetworks = this.getRootNetworks();

		rootNetworks[networkName] = {
			external: true
		};

		this.writeRootNetworksToFile(rootNetworks);
		Logger.info(`Successfully added network ${networkName} to compose root`);
	}

	public removeNetworkFromRoot(networkName: string): void {
		const rootNetworks = this.getRootNetworks();

		delete rootNetworks[networkName];
		this.writeRootNetworksToFile(rootNetworks);
		Logger.info(`Successfully removed network ${networkName} from compose root`);
	}

	private getRootNetworks(): PropertiesNetworks {
		Logger.info(JSON.stringify(this.compose));
		return this.compose.networks || {};
	}

	private writeRootNetworksToFile(networks: PropertiesNetworks): void {
		this.compose.networks = networks;
		this.saveToFile();
	}
}
