import { Logger } from "../../../logger/index";
import { ComposeEditor } from "./ComposeEditor";
import { PropertiesNetworks } from "./generated/types";

export class ComposeRootNetworkEditor extends ComposeEditor {
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
		const compose = this.readCompose();
		return compose.networks || {};
	}

	private writeRootNetworksToFile(networks: PropertiesNetworks): void {
		const compose = this.readCompose();
		compose.networks = networks;
		this.saveToFile(compose);
	}
}
