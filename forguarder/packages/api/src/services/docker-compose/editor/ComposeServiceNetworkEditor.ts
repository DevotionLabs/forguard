import { ComposeEditor } from "./ComposeEditor.js";
import { ComposeSpecification } from "./generated/types.js";
import { ServiceNetworkParser } from "./ServiceNetworkParser.js";
import { ServiceWithNetworks, ServiceNetwork } from "./types.js";

export class ComposeServiceNetworkEditor extends ComposeEditor {
	private serviceName: string;

	constructor({ path, serviceName }: { path: string; serviceName: string }) {
		super(path);
		this.serviceName = serviceName;
	}

	private getServiceWithNetworksFromCompose(): ServiceWithNetworks {
		const service = this.getServiceFromCompose();

		return {
			...service,
			networks: ServiceNetworkParser.normalize(service.networks)
		};
	}

	private getServiceFromCompose() {
		const services = this.getServicesFromCompose();
		const service = services[this.serviceName];

		if (!service) throw new Error(`No such service found in compose (${this.serviceName})`);

		return service;
	}

	private getServicesFromCompose() {
		const compose = this.readCompose();
		const services = compose.services;

		if (!services) throw new Error(`No services found in compose file`);

		return services;
	}

	// TODO: What if the network is already defined with other properties?
	public addNetworkToService(newNetwork: { name: string; props: ServiceNetwork }) {
		const service = this.getServiceWithNetworksFromCompose();
		service.networks[newNetwork.name] = newNetwork.props;

		this.updateServiceInComposeFile(service);
	}

	public removeNetworkFromService(networkToRemove: string) {
		const service = this.getServiceWithNetworksFromCompose();

		delete service.networks[networkToRemove];

		this.updateServiceInComposeFile(service);
	}

	private updateServiceInComposeFile(service: ServiceWithNetworks) {
		const compose = this.readCompose();
		if (!compose.services) compose.services = {};

		compose.services[this.serviceName] = service;

		this.saveToFile(compose);
	}
}
