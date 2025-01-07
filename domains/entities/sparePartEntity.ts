import {
	type ReorderLevel,
	type PartReference,
	type UnitPrice,
} from "domains/types/sparePart";
import { type QuantityStock } from "domains/types/stock";
import { DomainEntity, interfaceDomainEntity } from ".";

export interface SparePartDefinition {
	reference: PartReference;
	name: string;
	stock: QuantityStock;
	reorderLevel: ReorderLevel;
	unitPriceTTC: UnitPrice;
}

@interfaceDomainEntity
export class SparePartEntity extends DomainEntity<SparePartDefinition> {
	public static create(definition: SparePartDefinition) {
		return new SparePartEntity({
			...definition,
		});
	}
}
