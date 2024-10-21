import { execSync } from "child_process";
import { AvailableCommands, ComposeCommandFlags, ComposeDownFlags, ComposeUpFlags } from "./types";
import { ComposeFlagsParser } from "./ComposeFlagsParser";
import { Logger } from "../../../logger/index";

export class ComposeRunner {
	private path: string;

	constructor(path: string) {
		this.path = path;
	}

	public up(flags: ComposeUpFlags) {
		const output = this.runComposeCommand("up", flags);
		Logger.info(`Compose at ${this.path} is now UP`);
		return output;
	}

	public down(flags: ComposeDownFlags) {
		const output = this.runComposeCommand("down", flags);
		Logger.info(`Compose at ${this.path} is now DOWN`);
		return output;
	}

	private runComposeCommand(command: AvailableCommands, flags: ComposeCommandFlags) {
		const parsedFlags = ComposeFlagsParser.toString(flags);

		try {
			const stdout = execSync(`docker compose -f ${this.path} ${command} ${parsedFlags}`);
			Logger.info(stdout.toString());
			return stdout.toString();
		} catch (error) {
			throw new Error(`Could not execute compose command: ${error}`);
		}
	}
}
