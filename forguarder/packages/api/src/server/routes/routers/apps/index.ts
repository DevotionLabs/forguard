import { publicProcedure, router } from "../../trpc.js";
import { getAppsHandler } from "./handlers/getApps.js";
import { AppsDataSchema } from "./schemas.js";

export const appsRoutes = router({
	getApps: publicProcedure.output(AppsDataSchema).query(getAppsHandler)
});
