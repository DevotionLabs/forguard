import { ComposeEditor } from "./ComposeEditor.js";
import { ServiceNetworkParser } from "./ServiceNetworkParser.js";
import { ComposeServiceWithNetworks, ServiceNetwork } from "./types.js";

export class ComposeServiceNetworkEditor extends ComposeEditor {
	private service: ComposeServiceWithNetworks;

	constructor(path: string, serviceName: string) {
		super(path);
		this.service = this.getServiceWithNetworksFromCompose(serviceName);
	}

	private getServiceWithNetworksFromCompose(serviceName: string): ComposeServiceWithNetworks {
		const service = this.getServiceFromCompose(serviceName);

		return {
			...service,
			networks: ServiceNetworkParser.normalize(service.networks)
		};
	}

	private getServiceFromCompose(serviceName: string) {
		const services = this.getServicesFromCompose();
		const service = services[serviceName];

		if (!service) throw new Error(`No such service found in compose (${serviceName})`);

		return service;
	}

	private getServicesFromCompose() {
		const services = this.compose.services;

		if (!services) throw new Error(`No services found in ${this.path}`);

		return services;
	}

	// TODO: What if the network is already defined with other properties?
	public addNetworkToService(newNetwork: { name: string; props: ServiceNetwork }) {
		this.service.networks[newNetwork.name] = newNetwork.props;
		this.saveToFile();
	}

	public removeNetworkFromService(networkToRemove: string) {
		delete this.service.networks[networkToRemove];
		this.saveToFile();
	}
}
