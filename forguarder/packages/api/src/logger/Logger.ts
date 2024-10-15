import { SeverityColors, SeverityLevels } from "./types.js";

const severityColors: SeverityColors = {
	info: "\x1b[32m", // Green
	warn: "\x1b[33m", // Yellow
	error: "\x1b[31m", // Red
	debug: "\x1b[34m" // Blue
};

// Logger.log instead of this.log to prevent "Cannot read properties of undefined (reading 'log')"

export class Logger {
	public static info(message: string): void {
		Logger.log("info", message);
	}

	public static warn(message: string): void {
		Logger.log("warn", message);
	}

	public static error(message: string): void {
		Logger.log("error", message);
	}

	public static debug(message: string): void {
		Logger.log("debug", message);
	}

	private static log(severity: SeverityLevels, message: string) {
		const color = severityColors[severity];
		console.log(`${color}${Logger.formatMessage(severity, message)}\x1b[0m`);
	}

	private static formatMessage(level: string, message: string): string {
		const timestamp = Logger.getTimestamp();
		return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
	}

	private static getTimestamp(): string {
		return new Date().toISOString();
	}
}
