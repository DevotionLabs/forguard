import { z } from "zod";
import { targetProtocols } from "./params.js";

const TargetProtocolSchema = z.enum(targetProtocols);

const HttpsTargetSchema = z.object({
	app: z.string().min(1).trim(),
	service: z.string().min(1).trim(),
	protocol: TargetProtocolSchema,
	port: z.number().int().min(1).max(65535)
});

const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const HttpsMappingsSchema = z.record(
	z.string().refine((domain) => domainRegex.test(domain), {
		message: "Invalid domain format"
	}),
	HttpsTargetSchema
);

const ServiceExposureSchema = z.object({
	wireguard: z.boolean(),
	https: z.boolean()
});

const AppExposureSchema = z.record(ServiceExposureSchema);

const AppsExposureSchema = z.record(AppExposureSchema);

const ExposureSettingsSchema = z.object({
	apps: AppsExposureSchema,
	mappings: HttpsMappingsSchema
});

export const exposureSchemas = {
	TargetProtocolSchema,
	HttpsMappingsSchema,
	ServiceExposureSchema,
	AppsExposureSchema,
	ExposureSettingsSchema
};
