import { Logger } from "../../../../../logger/index.js";
import { AppsSettings } from "../../../../../exposureSettingsEngine/types.js";

export const updateAppsHandler = async ({ input }: { input: AppsSettings }): Promise<void> => {
	// TODO: Do things with input
	Logger.debug(`Updating apps: ${JSON.stringify(input)}`);
};
