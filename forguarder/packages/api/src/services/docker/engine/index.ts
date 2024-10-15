import { Configuration as SocketConfiguration, ContainerApi } from "./generated/index.js";

const config = new SocketConfiguration({
	basePath: "http://localhost"
});

console.log("Received call");

const containerApi = new ContainerApi(config);

console.log(`Container API: ${JSON.stringify(containerApi)}`);

//const response = await containerApi.containerList(true);
