export const sparePartCommandedSchema = zod.object({
	id: zod.string(),
	orderDate: zod.date(),
	reference: zod.string(),
	unitPriceTTC: zod.number(),
	quantity: zod.number(),
	dayDeliveryDelay: zod.number(),
});

export const sparePartSchema = zod.object({
	reference: zod.string(),
	name: zod.string(),
	stock: zod.number(),
	facturedPrice: zod.number(),
	reorderLevel: zod.number(),
});
