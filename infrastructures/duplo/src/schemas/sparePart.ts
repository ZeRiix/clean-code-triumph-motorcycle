export const sparePartCommandedSchema = zod.object({
	id: zod.string(),
	orderDate: zod.date(),
	reference: zod.string(),
	unitPriceTTC: zod.number(),
	quantity: zod.number(),
	dayDeliveryDelay: zod.number(),
});
