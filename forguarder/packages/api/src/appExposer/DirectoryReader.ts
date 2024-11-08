import fs from "fs";

export class DirectoryReader {
	private dirPath: string;

	constructor(dirPath: string) {
		this.dirPath = dirPath;
	}

	public getDirNames(): string[] {
		const entries = fs.readdirSync(this.dirPath, { withFileTypes: true });
		return this.filterDirNames(entries);
	}

	private filterDirNames(entries: fs.Dirent[]): string[] {
		return entries.filter((entry) => entry.isDirectory).map((entry) => entry.name);
	}
}
