import { ExposureSettings } from "./types";

export class AppExposer {
	public getExposureSettings(): ExposureSettings {
		throw new Error("Not implemented");
	}

	public setExposureSettings(_settings: ExposureSettings) {
		throw new Error("Not implemented");
	}
}
