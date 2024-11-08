import { targetProtocols } from "./params.js";
import { HttpsMappings, TargetProtocols } from "./types.js";

type TargetParts = HttpsMappings[string] & { domain: string };

export class HtttpsMappingParser {
	public static toString(map: HttpsMappings) {
		return Object.entries(map)
			.map(([domain, { app, service, protocol, port }]) => {
				const alias = `${service}.${app}.fg`; // TODO: Do this in a function

				return `${domain} -> ${protocol}://${alias}:${port}`;
			})
			.join(", ");
	}

	public static toMap(domainsStr: string) {
		const map: HttpsMappings = {};

		const domainEntries = domainsStr.split(",").map((entry) => entry.trim());

		for (const entry of domainEntries) {
			const { domain, protocol, service, app, port } = this.splitTargetParts(entry);
			map[domain] = {
				protocol,
				service,
				app,
				port
			};
		}

		return map;
	}

	private static splitTargetParts(domainEntry: string): TargetParts {
		const [domain, target] = domainEntry.split("->").map((part) => part.trim());
		const [rawProtocol, aliasAndPort] = target.split("://");
		const [alias, rawPort] = aliasAndPort.split(":");
		const [service, app] = alias.split(".");

		const protocol = this.toValidProtocol(rawProtocol);
		const port = this.toValidPort(rawPort);

		return {
			domain,
			protocol,
			service,
			app,
			port
		};
	}

	private static toValidProtocol(rawProtocol: string): TargetProtocols {
		return this.isValidProtocol(rawProtocol) ? (rawProtocol as TargetProtocols) : "http";
	}

	private static isValidProtocol(protocol: string): boolean {
		return targetProtocols.includes(protocol as TargetProtocols);
	}

	private static toValidPort(rawPort: string): number {
		const port = Number(rawPort); // TODO: Does this throw an error if the string is NaN?

		return port || 80;
	}
}
