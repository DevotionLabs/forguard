import {CorsOptions} from "cors";

export interface ApiConfig {
    apiPort: number;
    corsOrigin: CorsOptions["origin"];
}