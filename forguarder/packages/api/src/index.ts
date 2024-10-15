import { apiConfig } from "./config/apiConfig.js";
import { routesMap, Server } from "./server/index.js";

const server = new Server(apiConfig, routesMap);
server.start();
