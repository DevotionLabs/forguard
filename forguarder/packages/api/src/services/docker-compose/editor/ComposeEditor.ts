import { readFileSync, writeFileSync } from "fs";
import yaml from "js-yaml";
import { Logger } from "../../../logger/index.js";
import { ComposeSpecification } from "./generated/types.js";

export abstract class ComposeEditor {
	private path: string;

	constructor(path: string) {
		this.path = path;
		this.validateComposePath();
		Logger.info(`Succesfully loaded compose file from path ${this.path}`);
	}

	private validateComposePath(): void {
		try {
			this.readCompose();
		} catch (error) {
			throw new Error(`Could not create a ComposeEditor for path ${this.path}: ${error}`);
		}
	}

	protected readCompose(): ComposeSpecification {
		try {
			return this.parseComposeFile();
		} catch (error) {
			throw new Error(`Could not load the compose file: ${error}`);
		}
	}

	private parseComposeFile(): ComposeSpecification {
		const fileContents = readFileSync(this.path, "utf8");
		return yaml.load(fileContents) as ComposeSpecification;
	}

	protected saveToFile(compose: ComposeSpecification) {
		try {
			this.writeComposeToFile(compose);
		} catch (error) {
			throw new Error(`Could not save the compose file: ${error}`);
		}
	}

	private writeComposeToFile(compose: ComposeSpecification): void {
		const yamlStr = this.composeToString(compose);
		writeFileSync(this.path, yamlStr);
		Logger.info(`Successfully written compose to ${this.path}`);
	}

	private composeToString(compose: ComposeSpecification): string {
		const dumpOptions = {
			indent: 2,
			noArrayIndent: false,
			lineWidth: 80,
			condenseFlow: false
		};

		return yaml.dump(compose, dumpOptions);
	}
}
