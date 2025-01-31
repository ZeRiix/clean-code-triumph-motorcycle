/* eslint-disable @typescript-eslint/no-magic-numbers */
export const clientWarrantySchema = zod.object({
	clientSiret: zod.string(),
	startDate: zod.date(),
	endDate: zod.date(),
	description: zod.string().nullable(),
});

export const clientSchema = zod.object({
	siret: zod.string().length(14),
	phone: zod.string().length(10).nullable(),
	address: zod.string().nullable(),
	isPartner: zod.boolean(),
});
