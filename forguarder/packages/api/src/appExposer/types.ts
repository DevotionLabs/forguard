import { z } from "zod";
import { exposureSchemas } from "./schemas.js";

const { AppsExposureSchema, ExposureSettingsSchema, HttpsMappingsSchema, ServiceExposureSchema, TargetProtocolSchema } =
	exposureSchemas;

export type TargetProtocols = z.infer<typeof TargetProtocolSchema>;

export type ExposureSettings = z.infer<typeof ExposureSettingsSchema>;
export type HttpsMappings = z.infer<typeof HttpsMappingsSchema>;
export type AppsExposure = z.infer<typeof AppsExposureSchema>;
export type AppExposure = AppsExposure[string];
export type ServiceExposure = z.infer<typeof ServiceExposureSchema>;
