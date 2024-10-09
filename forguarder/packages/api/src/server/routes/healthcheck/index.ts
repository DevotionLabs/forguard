import { ServerRoute } from "../types";
import { handleHealthcheck } from "./handlers/handleHealthCheck";

const healthcheckRoutes: ServerRoute[] = [
  {
    method: "get",
    path: "/",
    handler: handleHealthcheck,
  },
];

export default healthcheckRoutes;
