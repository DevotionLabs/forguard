import * as dotenv from "dotenv";
import { ApiConfig, AppsPaths } from "./types.js";
import { defaultApiConfig, defaultAppsPaths } from "./params.js";

dotenv.config();

const { port, corsOrigin } = defaultApiConfig;

export const apiConfig: ApiConfig = {
	port: Number(process.env.FORGUARD_API_PORT) || port,
	corsOrigin: process.env.CORS_ORIGIN || corsOrigin
};

const { appsDirPath, httpsComposePath, wireguardComposePath } = defaultAppsPaths;

export const appsPaths: AppsPaths = {
	appsDirPath: process.env.APPS_DIR_PATH || appsDirPath,
	httpsComposePath: process.env.HTTPS_COMPOSE_PATH || httpsComposePath,
	// TODO: Separate forguarder compose services into several files
	wireguardComposePath: process.env.WIREGUARD_COMPOSE_PATH || wireguardComposePath
};
