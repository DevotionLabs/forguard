import { routesMap, Server } from "./server/index.js";

const port = process.env.FORGUARD_API_PORT || 3000;

const server = new Server(Number(port), routesMap);
server.start();
