export const clientWarrantySchema = zod.object({
	clientSiret: zod.string(),
	startDate: zod.date(),
	endDate: zod.date(),
	description: zod.string().nullable(),
});
