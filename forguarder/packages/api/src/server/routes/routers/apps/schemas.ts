import { z } from "zod";

const VpnSettingsSchema = z.object({
	exposed: z.boolean(),
	aliases: z.array(z.string())
});

const HttpsMappingSchema = z.object({
	exposed: z.boolean(),
	subdomain: z.string(),
	servicePort: z.number()
});

const HttpsSettingsSchema = z.object({
	mappings: z.array(HttpsMappingSchema)
});

const AppServiceDataSchema = z.object({
	vpn: VpnSettingsSchema,
	https: HttpsSettingsSchema
});

const AppDataSchema = z.record(z.string(), AppServiceDataSchema);

export const AppsDataSchema = z.record(z.string(), AppDataSchema);
