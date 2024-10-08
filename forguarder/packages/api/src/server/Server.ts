import express, { RouterOptions } from "express";
import { ReducedRouter } from "./ReducedRouter.js";
import { RoutesMap } from "./routes/types.js";

export class Server {
  private router: ReducedRouter;
  private port: number;
  private api;

  constructor(
    routesMap: RoutesMap,
    port: number,
    routerOptions?: RouterOptions
  ) {
    this.port = port;
    this.api = express();
    this.router = new ReducedRouter(routerOptions);
    this.setRoutes(routesMap);
  }

  private setRoutes(routesMap: RoutesMap) {
    Object.entries(routesMap).forEach(([subpath, routes]) =>
      this.router.addRoutes(routes, subpath)
    );

    this.api.use(this.router.getRouter());
  }

  public start() {
    this.api.listen(this.port, () => {
      return console.log(`ForGuarder server is listening at port ${this.port}`);
    });
  }
}
