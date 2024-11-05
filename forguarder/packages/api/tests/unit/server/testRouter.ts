import { initTRPC } from "@trpc/server";

const trpc = initTRPC.create();

export const testResponse = { message: "Test procedure works!" };

export const testRouter = trpc.router({
	testProcedure: trpc.procedure.query(() => {
		return testResponse;
	})
});
