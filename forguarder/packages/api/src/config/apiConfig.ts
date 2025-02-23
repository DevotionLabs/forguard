import * as dotenv from "dotenv";
import { ApiConfig } from "./types";

dotenv.config();

export const apiConfig: ApiConfig = {
	apiPort: Number(process.env.FORGUARD_API_PORT) || 3001,
	corsOrigin: process.env.CORS_ORIGIN || "http://localhost:3000"
};
