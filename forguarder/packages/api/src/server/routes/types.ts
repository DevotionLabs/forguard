import { RequestHandler } from "express";

export type HttpMethod = "get" | "head" | "post" | "put" | "delete" | "connect" | "options" | "trace" | "patch";

export interface ServerRoute {
	method: HttpMethod;
	path: string;
	handler: RequestHandler;
}

export interface RoutesMap {
	[path: string]: ServerRoute[];
}
