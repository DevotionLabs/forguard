import { CorsOptions } from "cors";

export interface ApiConfig {
	port: number;
	corsOrigin: CorsOptions["origin"];
}

export interface AppsPaths {
	appsDirPath: string;
	httpsComposePath: string;
	wireguardComposePath: string;
}
