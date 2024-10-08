import { Router, RouterOptions } from "express";
import { ServerRoute } from "./routes/types.js";

export class ReducedRouter {
  private router: Router;

  constructor(options?: RouterOptions) {
    this.router = Router(options);
  }

  public addRoutes(routes: ServerRoute[], subpath?: string) {
    routes.forEach((route) => this.addRoute(route, subpath));
  }

  private addRoute(route: ServerRoute, subpath?: string) {
    const { method, path, handler } = route;
    const fullpath = `${subpath}${path}`;
    this.router[method](fullpath, handler);
  }

  // TODO: Return a copy of the router, not the router itself
  public getRouter() {
    return this.router;
  }
}
