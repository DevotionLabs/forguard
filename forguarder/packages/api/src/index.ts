import { routesMap, Server } from "./server/index.js";

const server = new Server(3000, routesMap);
server.start();
