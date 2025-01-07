import { z } from "zod";
import { createValueObject, type GetValueObject } from ".";

const MIN_STOCK = 0;

export const quantityStockType = createValueObject(
	"QuantityStock",
	z.number().min(MIN_STOCK),
);

export type QuantityStock = GetValueObject<typeof quantityStockType>;
