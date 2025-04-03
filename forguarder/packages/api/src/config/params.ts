import path from "path";
import { ApiConfig, AppsPaths } from "./types.js";

export const defaultComposeFileName = "docker-compose.yml";

const httpsPortalAppName = "https-portal";
const wireguardAppName = "wireguard";

export const defaultApiConfig: ApiConfig = {
	port: 3001,
	corsOrigin: "http://localhost:3000"
};

export const defaultAppsPaths: AppsPaths = {
	appsDirPath: path.join(process.cwd(), "apps"),
	httpsComposePath: path.join(process.cwd(), `${httpsPortalAppName}/${defaultComposeFileName}`),
	wireguardComposePath: path.join(process.cwd(), `${wireguardAppName}/${defaultComposeFileName}`)
};
