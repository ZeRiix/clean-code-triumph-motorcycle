import zodSchema from "@zodyac/zod-mongoose"
import { idType, positiveNumberType } from "domains/types/commonType"
import { partReferenceType } from "domains/types/sparePartType"
import { model } from "mongoose"
import { z } from "zod"

const sparePartBase = z.object({
	date: z.date(),
	reference: partReferenceType.zodSchema,
	quantity: positiveNumberType.zodSchema,
})

const sparePartSchema = z.union([
	sparePartBase.extend({
		type: z.literal("inStock")
	}),
	sparePartBase.extend({
		type: z.literal("used"),
		maintenanceInterviewIssue: idType.zodSchema,
	}),
	sparePartBase.extend({
		type: z.literal("commanded"),
		unitPriceTTC: idType.zodSchema,
		dayDeliveryDelay: positiveNumberType.zodSchema
	}),
])

const sparePartDocument = z.object({
	sparePart: sparePartSchema
})

export const SparePart = model(
	"SparePart",
	zodSchema(sparePartDocument),
);