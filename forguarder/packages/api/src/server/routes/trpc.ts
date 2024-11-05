import { initTRPC } from "@trpc/server";

const trpc = initTRPC.create();

export const publicProcedure = trpc.procedure;

export const router = trpc.router;

export const mergeRouters = trpc.mergeRouters;
