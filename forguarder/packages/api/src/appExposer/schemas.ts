import { z } from "zod";
import { targetProtocols } from "./params.js";

export const TargetProtocolSchema = z.enum(targetProtocols);

const HttpsTargetSchema = z.object({
	app: z.string(),
	service: z.string(),
	protocol: TargetProtocolSchema,
	port: z.number().int().positive()
});

const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const HttpsMappingsSchema = z.record(
	z.string().refine((domain) => domainRegex.test(domain), {
		message: "Invalid domain format"
	}),
	HttpsTargetSchema
);

export const ServiceExposureSchema = z.object({
	wireguard: z.boolean(),
	https: z.boolean()
});

export const AppExposureSchema = z.record(ServiceExposureSchema);

export const AppsExposureSchema = z.record(AppExposureSchema);

export const ExposureSettingsSchema = z.object({
	apps: AppsExposureSchema,
	mappings: HttpsMappingsSchema
});
