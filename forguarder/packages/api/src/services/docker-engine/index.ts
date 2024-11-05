import { Logger } from "../../logger/Logger.js";
import { Configuration as SocketConfiguration, ContainerApi } from "./generated/index.js";

const config = new SocketConfiguration({
	basePath: "http://localhost"
});

Logger.debug("Received call");

const containerApi = new ContainerApi(config);

Logger.debug(`Container API: ${JSON.stringify(containerApi)}`);

//const response = await containerApi.containerList(true);
