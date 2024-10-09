import healthcheckRoutes from "./healthcheck/index";
import { RoutesMap } from "./types";

export const routesMap: RoutesMap = {
  "/healthcheck": healthcheckRoutes,
};
