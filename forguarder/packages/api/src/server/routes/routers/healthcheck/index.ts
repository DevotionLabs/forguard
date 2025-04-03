import { z } from "zod";
import { publicProcedure, router } from "../../trpc.js";
import { handleHealthCheck } from "./handler.js";

export const healthCheckRouter = router({
	healthCheck: publicProcedure.input(z.void()).query(handleHealthCheck)
});
