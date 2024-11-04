import cors from "cors";
import express from "express";
import * as trpcExpress from "@trpc/server/adapters/express";
import { ApiConfig } from "../config/types.js";
import { serverRouter } from "./routes/index.js";

export class Server {
	private port: number;
	private api: express.Application;

	constructor(config: ApiConfig) {
		const { apiPort, corsOrigin } = config;

		this.port = apiPort;
		this.api = express();
		this.setupCors(corsOrigin);
		this.setRoutes();
	}

	private setupCors(corsOrigin: ApiConfig["corsOrigin"]) {
		this.api.use(
			cors({
				origin: corsOrigin
			})
		);
	}

	private setRoutes() {
		this.api.use(
			trpcExpress.createExpressMiddleware({
				router: serverRouter
			})
		);
	}

	public start() {
		this.api.listen(this.port, () => {
			console.log(`ForGuarder server is listening at port ${this.port}`);
		});
	}
}
