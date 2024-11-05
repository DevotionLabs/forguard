import { appsRoutes } from "./routers/apps/index.js";
import { healthCheckRouter } from "./routers/healthcheck/index.js";
import { mergeRouters } from "./trpc.js";

export const serverRouter = mergeRouters(healthCheckRouter, appsRoutes);
