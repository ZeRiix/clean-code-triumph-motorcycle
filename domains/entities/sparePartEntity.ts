import {
	type ReorderLevel,
	type PartReference,
	type UnitPrice,
} from "domains/types/sparePartType";
import { quantityStockType, type QuantityStock } from "domains/types/stockType";
import { DomainEntity, interfaceDomainEntity } from ".";

export interface SparePartDefinition {
	reference: PartReference;
	name: string;
	stock: QuantityStock;
	reorderLevel: ReorderLevel;
	unitPriceTTC: UnitPrice;
}

const DEFAULT_STOCK = 0;

@interfaceDomainEntity
export class SparePartEntity extends DomainEntity<SparePartDefinition> {
	private static defaultStock = quantityStockType.createOrThrow(DEFAULT_STOCK);

	public static create(definition: Omit<SparePartDefinition, "stock">) {
		return new SparePartEntity({
			...definition,
			stock: SparePartEntity.defaultStock,
		});
	}
}
