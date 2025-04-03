import { ComposeFileProcessor } from "../../services/docker-compose/editor/ComposeFileProcessor.js";
import { ComposeSpecification, ListOrDict } from "../../services/docker-compose/editor/generated/types.js";
import { HtttpsMappingParser } from "../HttpsMappingParser.js";
import { httpsParams } from "../params.js";
import { HttpsMappings } from "../types.js";

export class HttpsMappingReader {
	private composeFilePath: string;

	constructor(httpsComposePath: string) {
		this.composeFilePath = httpsComposePath;
	}

	public readMappings(): HttpsMappings {
		const composeReader = new ComposeFileProcessor(this.composeFilePath);
		const compose = composeReader.readCompose();
		return this.getMappingsFromCompose(compose);
	}

	private getMappingsFromCompose(compose: ComposeSpecification): HttpsMappings {
		const envs = this.getHttpsEnvs(compose);
		if (!envs) return {};

		const domains = this.extractDomainsFromEnv(envs);
		return HtttpsMappingParser.toMap(domains);
	}

	private getHttpsEnvs(compose: ComposeSpecification): ListOrDict | undefined {
		const services = compose.services;
		const httpsService = services?.[httpsParams.serviceName];
		return httpsService?.environment;
	}

	private extractDomainsFromEnv(envs: ListOrDict): string {
		if (Array.isArray(envs)) return "";

		const domainEnvValue = envs[httpsParams.domainsEnvName];

		if (typeof domainEnvValue !== "string")
			throw new Error(
				`Expected a string for '${httpsParams.domainsEnvName}' in the HTTPS portal environment variables.`
			);

		return domainEnvValue;
	}
}
