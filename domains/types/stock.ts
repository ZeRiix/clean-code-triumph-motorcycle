import { z } from "zod";
import { createValueObject, type GetValueObject } from ".";

export const quantityStockType = createValueObject(
	"QuantityStock",
	z.number().positive(),
);

export type QuantityStock = GetValueObject<typeof quantityStockType>;
