import cors from "cors";
import express from "express";
import { ReducedRouter } from "./ReducedRouter.js";
import { RoutesMap } from "./routes/types.js";
import { ApiConfig } from "../config/types.js";

export class Server {
	private port: number;
	private api: express.Application;

	constructor(config: ApiConfig, routesMap: RoutesMap) {
		const { apiPort, corsOrigin } = config;

		this.port = apiPort;
		this.api = express();
		this.setupCors(corsOrigin);
		this.setRoutes(routesMap);
	}

	private setupCors(corsOrigin: ApiConfig["corsOrigin"]) {
		this.api.use(
			cors({
				origin: corsOrigin
			})
		);
	}

	private setRoutes(routesMap: RoutesMap) {
		const customRouter = new ReducedRouter(routesMap);
		const fullRouter = customRouter.getRouter();
		this.api.use(fullRouter);
	}

	public start() {
		this.api.listen(this.port, () => {
			console.log(`ForGuarder server is listening at port ${this.port}`);
		});
	}
}
