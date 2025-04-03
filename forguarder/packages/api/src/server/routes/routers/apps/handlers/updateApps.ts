import { Logger } from "../../../../../logger/index.js";
import { ExposureSettings } from "../../../../../appExposer/index.js";

export const handleUpdateApps = async ({ input }: { input: ExposureSettings }): Promise<void> => {
	// TODO: Do things with input
	Logger.debug(`Updating apps: ${JSON.stringify(input)}`);
};
