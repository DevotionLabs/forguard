import { ComposeCommandFlag, ComposeCommandFlags } from "./types";

export class ComposeFlagsParser {
	public static toString(flags: ComposeCommandFlags): string {
		return this.toArray(flags).join(" ");
	}

	private static toArray(flags: ComposeCommandFlags): string[] {
		const flagEntries = Object.entries(flags);
		return flagEntries.map((flag) => this.parseFlagEntry(flag));
	}

	private static parseFlagEntry(flag: ComposeCommandFlag): string {
		const [key, value] = flag;

		if (typeof value === "boolean") {
			return `--${key}`;
		} else {
			return `--${key}=${value}`;
		}
	}
}
