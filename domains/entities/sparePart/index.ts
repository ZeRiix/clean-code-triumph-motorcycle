import {
	type ReorderLevel,
	type PartReference,
} from "domains/types/sparePartType";
import { DomainEntity, interfaceDomainEntity } from "..";
import { QuantityStock, quantityStockType } from "domains/types/stockType";
import { PositiveNumber } from "../../types/commonType";

export interface SparePartDefinition {
	reference: PartReference;
	name: string;
	stock: QuantityStock;
	facturedPrice: PositiveNumber;
	reorderLevel: ReorderLevel;
}

const DEFAULT_STOCK = 0;

@interfaceDomainEntity
export class SparePartEntity extends DomainEntity<SparePartDefinition> {
	public static readonly SPARE_PART_PROFIT = 1.15;

	public stockLessThanReorderLevel() {
		return this.definition.stock.value < this.definition.reorderLevel.value;
	}

	private static defaultStock = quantityStockType.createOrThrow(DEFAULT_STOCK);

	public static create(definition: Omit<SparePartDefinition, "stock">) {
		return new SparePartEntity({
			...definition,
			stock: SparePartEntity.defaultStock,
		});
	}
}
