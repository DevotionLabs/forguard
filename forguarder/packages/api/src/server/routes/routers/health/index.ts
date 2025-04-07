import { z } from "zod";
import { publicProcedure, router } from "../../trpc.js";
import { handleHealthCheck } from "./handler.js";

export const healthRouter = router({
	check: publicProcedure.input(z.void()).query(handleHealthCheck)
});
