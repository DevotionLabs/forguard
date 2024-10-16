import { readFileSync, writeFileSync } from "fs";
import yaml from "js-yaml";
import { Logger } from "../../../logger/index.js";
import { ComposeSpecification } from "./generated/types.js";

export class ComposeEditor {
	private path: string;
	private compose: ComposeSpecification;

	constructor(path: string) {
		this.path = path;
		this.compose = this.loadFromFile();
	}

	private loadFromFile(): ComposeSpecification {
		try {
			return this.parseComposeFile();
		} catch (error) {
			Logger.error(`Error loading the compose file: ${error}`);
			throw error;
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
			Logger.error(`Error saving the compose file: ${error}`);
			throw error;
		}
	}

	private writeComposeToFile(): void {
		const yamlStr = yaml.dump(this.compose);
		writeFileSync(this.path, yamlStr, "utf8");
		Logger.info(`Successfully written compose to ${this.path}`);
	}
}
