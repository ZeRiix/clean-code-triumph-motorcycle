import { type SparePart } from "@prisma/client";
import { SparePartEntity } from "domains/entities/sparePart";
import { positiveNumberType } from "domains/types/commonType";
import { partReferenceType, reorderLevelType } from "domains/types/sparePartType";
import { quantityStockType } from "domains/types/stockType";

export function sparePartMapper(prismaSparePart: SparePart, quantity: number) {
	const {
		reference,
		reorderLevel,
		facturedPrice,
		name,
	} = prismaSparePart;

	return new SparePartEntity({
		name,
		reference: partReferenceType.createOrThrow(reference),
		reorderLevel: reorderLevelType.createOrThrow(reorderLevel),
		facturedPrice: positiveNumberType.createOrThrow(facturedPrice.toNumber()),
		stock: quantityStockType.createOrThrow(quantity),
	});
}
