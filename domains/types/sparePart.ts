import { z } from "zod";
import { createValueObject, type GetValueObject } from ".";

const SKU_PATTERN = /^[a-zA-Z0-9]{1,20}$/;

export const partReferenceType = createValueObject(
	"PartReference",
	z.string().regex(SKU_PATTERN),
);

export type PartReference = GetValueObject<typeof partReferenceType>;

const MIN_REORDER_LEVEL = 0;

export const reorderLevelType = createValueObject(
	"ReorderLevel",
	z.number().min(MIN_REORDER_LEVEL),
);

export type ReorderLevel = GetValueObject<typeof reorderLevelType>;

export const unitPriceType = createValueObject(
	"UnitPrice",
	z.number().positive(),
);

export type UnitPrice = GetValueObject<typeof unitPriceType>;
