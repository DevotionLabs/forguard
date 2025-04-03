import { AppsPaths } from "../config/types.js";
import { ExposureSettings, HttpsMappings } from "./types.js";
import { DirectoryReader } from "./DirectoryReader.js";
import { ExposureSettingsBuilder } from "./ExposureSettingsBuilder.js";
import { HttpsMappingReader } from "./httpsMappingReader/HttpsMappingReader.js";

export class ExposureSettingsReader {
	private appsPaths: AppsPaths;

	constructor(appPaths: AppsPaths) {
		this.appsPaths = appPaths;
	}

	public readExposureSettingsFromFs(): ExposureSettings {
		const appNames = this.getAppNames();
		const mappings = this.getHttpsMappings();

		return this.buildExposureSettings(appNames, mappings);
	}

	private getAppNames(): string[] {
		const appsDirReader = new DirectoryReader(this.appsPaths.appsDirPath);
		return appsDirReader.getDirNames();
	}

	private getHttpsMappings(): HttpsMappings {
		const httpsReader = new HttpsMappingReader(this.appsPaths.httpsComposePath);
		return httpsReader.readMappings();
	}

	private buildExposureSettings(appNames: string[], domains: HttpsMappings): ExposureSettings {
		const appsSettingsBuilder = new ExposureSettingsBuilder(this.appsPaths);
		return appsSettingsBuilder.build(appNames, domains);
	}
}
