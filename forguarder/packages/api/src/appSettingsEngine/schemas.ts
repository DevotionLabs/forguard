import { z } from "zod";

const VpnSettingsSchema = z.object({
	exposed: z.boolean(),
	aliases: z.array(z.string())
});

const HttpsMappingSchema = z.object({
	subdomain: z.string(),
	servicePort: z.number()
});

const HttpsSettingsSchema = z.object({
	exposed: z.boolean(),
	mappings: z.array(HttpsMappingSchema)
});

const AppServiceSettingsSchema = z.object({
	vpn: VpnSettingsSchema,
	https: HttpsSettingsSchema
});

const AppSettingsSchema = z.record(z.string(), AppServiceSettingsSchema);

export const AppsSettingsSchema = z.record(z.string(), AppSettingsSchema);

export type AppsSettings = z.infer<typeof AppsSettingsSchema>;
