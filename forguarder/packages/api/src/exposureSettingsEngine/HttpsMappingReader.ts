import { ComposeFileProcessor } from "../services/docker-compose/editor/ComposeFileProcessor.js";
import { ComposeSpecification, ListOrDict } from "../services/docker-compose/editor/generated/types.js";
import { HtttpsMappingParser } from "./HttpsMappingParser.js";
import { httpsParams } from "./params.js";
import { HttpsMappings } from "./types.js";

export class HttpsMappingReader {
	private httpsComposePath: string;

	constructor(httpsComposePath: string) {
		this.httpsComposePath = httpsComposePath;
	}

	public readMappings(): HttpsMappings {
		const composeReader = new ComposeFileProcessor(this.httpsComposePath);
		const compose = composeReader.readCompose();
		return this.getMappingsFromCompose(compose);
	}

	private getMappingsFromCompose(compose: ComposeSpecification): HttpsMappings {
		const services = compose.services;

		if (!services) return {};

		const envs = services[httpsParams.serviceName].environment;

		if (!envs) return {};

		const domains = this.getDomainsFromEnv(envs);

		return HtttpsMappingParser.toMap(domains);
	}

	private getDomainsFromEnv(envs: ListOrDict): string {
		if (Array.isArray(envs)) return "";

		const domainEnvValue = envs[httpsParams.domainsEnvName];

		if (typeof domainEnvValue != "string")
			throw new Error(`HTTPS Portal domains environment variable must be a string`);

		return domainEnvValue;
	}
}
