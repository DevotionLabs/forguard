import { z } from "zod";
import {
	AppExposureSchema,
	AppsExposureSchema,
	ExposureSettingsSchema,
	HttpsMappingsSchema,
	ServiceExposureSchema,
	TargetProtocolSchema
} from "./schemas.js";

export type TargetProtocols = z.infer<typeof TargetProtocolSchema>;

export type ExposureSettings = z.infer<typeof ExposureSettingsSchema>;
export type HttpsMappings = z.infer<typeof HttpsMappingsSchema>;
export type AppsExposure = z.infer<typeof AppsExposureSchema>;
export type AppExposure = z.infer<typeof AppExposureSchema>;
export type ServiceExposure = z.infer<typeof ServiceExposureSchema>;
