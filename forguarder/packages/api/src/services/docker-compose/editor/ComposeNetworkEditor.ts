import { ComposeRootNetworkEditor } from "./ComposeRootNetworkEditor";
import { ComposeServiceNetworkEditor } from "./ComposeServiceNetworkEditor";

export class ComposeNetworkEditor {
	private rootEditor: ComposeRootNetworkEditor;
	private serviceEditor: ComposeServiceNetworkEditor;

	constructor({ path, serviceName }: { path: string; serviceName: string }) {
		this.rootEditor = new ComposeRootNetworkEditor(path);
		this.serviceEditor = new ComposeServiceNetworkEditor({
			path,
			serviceName
		});
	}

	public addNetwork(networkName: string, aliases: string[]) {
		this.validateAliases(aliases);

		const serviceNetwork = {
			name: networkName,
			props: {
				aliases
			}
		};

		// TODO: What if only the second step fails?
		this.rootEditor.addExternalNetworkToRoot(networkName);
		this.serviceEditor.addNetworkToService(serviceNetwork);
	}

	public removeNetwork(networkName: string) {
		this.serviceEditor.removeNetworkFromService(networkName);
		this.rootEditor.removeNetworkFromRoot(networkName);
	}

	private validateAliases(aliases: string[]) {
		if (aliases.length === 0) throw new Error(`At least 1 alias must be set`);
	}
}
