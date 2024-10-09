import { Router, RouterOptions } from "express";
import { RoutesMap, ServerRoute } from "./routes/types";

export class ReducedRouter {
  private router: Router;

  constructor(routesMap: RoutesMap, options?: RouterOptions) {
    this.router = Router(options);
    this.addRoutesMap(routesMap);
  }

  private addRoutesMap(routesMap: RoutesMap) {
    Object.entries(routesMap).forEach(([subpath, routes]) =>
      this.addRoutes(routes, subpath)
    );
  }

  private addRoutes(routes: ServerRoute[], subpath?: string) {
    routes.forEach((route) => this.addRoute(route, subpath));
  }

  private addRoute(route: ServerRoute, subpath?: string) {
    const { method, path, handler } = route;
    const fullpath = `${subpath}${path}`;
    this.router[method](fullpath, handler);
  }

  public getRouter() {
    const clonedRouter = Router();
    clonedRouter.use(this.router);
    return clonedRouter;
  }
}
