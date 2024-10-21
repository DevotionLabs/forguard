import { readFileSync, writeFileSync } from "fs";
import yaml from "js-yaml";
import { Logger } from "../../../logger/index.js";
import { ComposeSpecification } from "./generated/types.js";

export abstract class ComposeEditor {
	protected path: string;
	protected compose: ComposeSpecification;

	constructor(path: string) {
		this.path = path;
		this.compose = this.loadFromFile();
		Logger.info(`Succesfully loaded compose file from path ${this.path}`);
	}

	private loadFromFile(): ComposeSpecification {
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

	protected saveToFile() {
		try {
			this.writeComposeToFile();
		} catch (error) {
			throw new Error(`Could not save the compose file: ${error}`);
		}
	}

	private writeComposeToFile(): void {
		const yamlStr = yaml.dump(this.compose);
		writeFileSync(this.path, yamlStr, "utf8");
		Logger.info(`Successfully written compose to ${this.path}`);
	}
}
