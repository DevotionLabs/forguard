import { apiConfig } from "./config/apiConfig.js";
import { Server } from "./server/index.js";

const server = new Server(apiConfig);
server.start();
