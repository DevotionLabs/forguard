import { apiConfig } from "./config/config.js";
import { Server, serverRouter } from "./server/index.js";

const server = new Server(apiConfig, serverRouter);
server.start();
