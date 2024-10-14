import express, { RouterOptions } from "express";
import { ReducedRouter } from "./ReducedRouter.js";
import { RoutesMap } from "./routes/types.js";

export class Server {
  private port: number;
  private api: express.Application;

  constructor(
    port: number,
    routesMap: RoutesMap,
    routerOptions?: RouterOptions
  ) {
    this.port = port;
    this.api = express();
    this.setRoutes(routesMap, routerOptions);
  }

  private setRoutes(routesMap: RoutesMap, routerOptions?: RouterOptions) {
    const customRouter = new ReducedRouter(routesMap, routerOptions);
    const fullRouter = customRouter.getRouter();
    this.api.use(fullRouter);
  }

  public start() {
    this.api.listen(this.port, () => {
      console.log(`ForGuarder server is listening at port ${this.port}`);
    });
  }
}
