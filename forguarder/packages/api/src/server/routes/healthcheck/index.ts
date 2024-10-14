import { ServerRoute } from "../types.js";
import { handleHealthcheck } from "./handlers/handleHealthCheck.js";

const healthcheckRoutes: ServerRoute[] = [
  {
    method: "get",
    path: "/",
    handler: handleHealthcheck,
  },
];

export default healthcheckRoutes;
