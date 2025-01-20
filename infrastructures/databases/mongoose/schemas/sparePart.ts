import zodSchema from "@zodyac/zod-mongoose";
import { idType, positiveNumberType } from "domains/types/commonType";
import { partReferenceType, unitPriceType } from "domains/types/sparePartType";
import { model } from "mongoose";
import { z } from "zod";

const sparePartBase = z.object({
	date: z.date(),
	reference: partReferenceType.zodSchema,
	quantity: positiveNumberType.zodSchema,
});

export const sparePartSchema = z.union([
	sparePartBase.extend({
		type: z.literal("inStock"),
	}),
	sparePartBase.extend({
		id: idType.zodSchema,
		type: z.literal("used"),
		maintenanceInterviewIssue: idType.zodSchema,
	}),
	sparePartBase.extend({
		type: z.literal("commanded"),
		id: idType.zodSchema,
		unitPriceTTC: unitPriceType.zodSchema,
		dayDeliveryDelay: positiveNumberType.zodSchema,
	}),
]);

export const sparePartDocument = z.object({
	sparePart: sparePartSchema,
});

export const SparePartModel = model(
	"SparePart",
	zodSchema(sparePartDocument),
);
