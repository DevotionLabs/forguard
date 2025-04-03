import path from "path";
import { ServiceNetworkParser } from "../services/docker-compose/index.js";
import { ComposeFileProcessor } from "../services/docker-compose/editor/ComposeFileProcessor.js";
import {
	ComposeSpecification,
	DefinitionsService,
	PropertiesServices
} from "../services/docker-compose/editor/generated/types.js";
import { ServiceNetworks } from "../services/docker-compose/editor/types.js";
import { wireguardParams, httpsParams } from "./params.js";
import { HttpsMappings, ExposureSettings, AppsExposure, ServiceExposure, AppExposure } from "./types.js";
import { AppsPaths } from "../config/types.js";

interface AppComposeMap {
	[app: string]: ComposeSpecification;
}

export class ExposureSettingsBuilder {
	private appsPaths: AppsPaths;

	constructor(appsPaths: AppsPaths) {
		this.appsPaths = appsPaths;
	}

	public build(apps: string[], mappings: HttpsMappings): ExposureSettings {
		const appComposes = this.readAppsComposeFiles(apps);

		return {
			apps: this.buildAppsExposureSettings(appComposes),
			mappings
		};
	}

	private readAppsComposeFiles(apps: string[]): AppComposeMap {
		const appComposes: AppComposeMap = {};

		apps.forEach((app) => (appComposes[app] = this.readAppCompose(app)));

		return appComposes;
	}

	private readAppCompose(appName: string) {
		const appComposePath = path.join(this.appsPaths.appsDirPath, appName);
		const composeReader = new ComposeFileProcessor(appComposePath);
		return composeReader.readCompose();
	}

	private buildAppsExposureSettings(appComposes: AppComposeMap): AppsExposure {
		return Object.fromEntries(
			Object.entries(appComposes).map(([appName, appCompose]) => [
				appName,
				this.buildAppExposure(appName, appCompose.services)
			])
		);
	}

	private buildAppExposure(appName: string, services?: PropertiesServices): AppExposure {
		const appSettings: AppExposure = {};

		if (!services) return {}; // TODO: Is it ok to return {} here?

		Object.entries(services).map(([serviceName, service]) => {
			const dockerNetworkAlias = `${serviceName}.${appName}.fg`; // TODO: Use function
			appSettings[serviceName] = this.buildServiceSettings(service, dockerNetworkAlias);
		});

		return appSettings;
	}

	private buildServiceSettings(service: DefinitionsService, dockerNetworkAlias: string): ServiceExposure {
		const networks = ServiceNetworkParser.normalize(service.networks);

		const httpsNet = networks[httpsParams.networkName];
		const wgNet = networks[wireguardParams.networkName];

		return {
			wireguard: this.isConnectedToDockerNetwork(wgNet, dockerNetworkAlias),
			https: this.isConnectedToDockerNetwork(httpsNet, dockerNetworkAlias)
		};
	}

	private isConnectedToDockerNetwork(network: ServiceNetworks[string], alias: string) {
		if (!network) return false;

		if (!network.aliases?.includes(alias)) {
			throw new Error(`Alias ${alias} is not included among the network aliases `);
		}

		return true;
	}
}
