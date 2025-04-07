import { appsRoutes } from "./routers/apps/index.js";
import { healthRouter } from "./routers/health/index.js";
import { router } from "./trpc.js";

export const serverRouter = router({
	health: healthRouter,
	apps: appsRoutes
});
