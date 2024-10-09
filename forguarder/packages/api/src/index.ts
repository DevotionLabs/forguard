import { routesMap, Server } from "./server/index";

const server = new Server(3000, routesMap);
server.start();
