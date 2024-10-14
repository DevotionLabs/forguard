import healthcheckRoutes from "./healthcheck/index.js";
import { RoutesMap } from "./types.js";

export const routesMap: RoutesMap = {
  "/healthcheck": healthcheckRoutes,
};
