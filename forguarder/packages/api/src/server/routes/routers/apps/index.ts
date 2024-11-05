import { publicProcedure, router } from "../../trpc.js";
import { getAppsHandler } from "./handlers/getApps.js";
import { updateAppsHandler } from "./handlers/updateApps.js";
import { AppsSettingsSchema } from "../../../../appSettingsEngine/schemas.js";

export const appsRoutes = router({
	getApps: publicProcedure.output(AppsSettingsSchema).query(getAppsHandler),
	updateApps: publicProcedure.input(AppsSettingsSchema).mutation(updateAppsHandler)
});
