import { publicProcedure, router } from "../../trpc.js";
import { handleGetApps } from "./handlers/getApps.js";
import { handleUpdateApps } from "./handlers/updateApps.js";
import { exposureSchemas } from "../../../../appExposer/index.js";

const { ExposureSettingsSchema } = exposureSchemas;

export const appsRoutes = router({
	getApps: publicProcedure.output(ExposureSettingsSchema).query(handleGetApps),
	updateApps: publicProcedure.input(ExposureSettingsSchema).mutation(handleUpdateApps)
});
