import cors from "cors";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { ApiConfig } from "../config/types.js";
import { AnyRouter } from "@trpc/server";
import { Logger } from "../logger/Logger.js";

export class Server {
	private port: number;
	private api: express.Application;

	constructor(config: ApiConfig, router: AnyRouter) {
		const { port: apiPort, corsOrigin } = config;

		this.port = apiPort;
		this.api = express();
		this.setupCors(corsOrigin);
		this.setRouter(router);
	}

	private setupCors(corsOrigin: ApiConfig["corsOrigin"]) {
		this.api.use(
			cors({
				origin: corsOrigin
			})
		);
	}

	private setRouter(router: AnyRouter) {
		this.api.use(
			trpcExpress.createExpressMiddleware({
				router
			})
		);
	}

	public start() {
		this.api.listen(this.port, () => this.logServerStart);
	}

	private logServerStart() {
		Logger.info(`ForGuarder server is listening at port ${this.port}`);
	}
}
