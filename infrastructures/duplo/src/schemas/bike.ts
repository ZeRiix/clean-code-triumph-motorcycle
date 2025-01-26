export const bikeSchema = zod.object({
	vin: zod.string(),
	modelName: zod.string(),
	registration: zod.string(),
	factoryYear: zod.number(),
	mileage: zod.number(),
	purchaseDate: zod.date(),
	stillInCirculation: zod.boolean(),
	lastInterviewDate: zod.date(),
});
