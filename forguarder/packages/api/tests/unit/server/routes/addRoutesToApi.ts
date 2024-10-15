import express from "express";
import { ServerRoute } from "../../../../src/server/routes/types";

export function addRoutesToApi(routes: ServerRoute[], api: express.Application) {
	routes.forEach((route) => api[route.method](route.path, route.handler));
}
