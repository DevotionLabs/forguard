import { Configuration, ContainerApi } from "./generated/index.js";

const config = new Configuration({
  basePath: "http://localhost",
});

console.log("Received call");

const containerApi = new ContainerApi(config);

//const response = await containerApi.containerList(true);
