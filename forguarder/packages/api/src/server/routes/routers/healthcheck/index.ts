import { publicProcedure, router } from "../../trpc.js";
import { healthCheckHandler } from "./handler.js";

export const healthCheckRouter = router({
	healthCheck: publicProcedure.query(healthCheckHandler)
});
