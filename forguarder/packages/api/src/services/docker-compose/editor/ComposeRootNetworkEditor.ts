import { Logger } from "../../../logger/index";
import { ComposeFileProcessor } from "./ComposeFileProcessor";
import { PropertiesNetworks } from "./generated/types";

export class ComposeRootNetworkEditor {
	private fileProcessor: ComposeFileProcessor;

	constructor(path: string) {
		this.fileProcessor = new ComposeFileProcessor(path);
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
		const compose = this.fileProcessor.readCompose();
		return compose.networks || {};
	}

	private writeRootNetworksToFile(networks: PropertiesNetworks): void {
		const compose = this.fileProcessor.readCompose();
		compose.networks = networks;
		this.fileProcessor.saveToFile(compose);
	}
}
