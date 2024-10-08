import { routesMap, Server } from "./server/index.js";

const server = new Server(routesMap, 3000);
server.start();
