import {
	type ReorderLevel,
	type PartReference,
	type UnitPrice,
} from "domains/types/sparePart";
import { type QuantityStock } from "domains/types/stock";

export interface SparePartDefinition {
	reference: PartReference;
	name: string;
	stock: QuantityStock;
	reorderLevel: ReorderLevel;
	unitPriceTTC: UnitPrice;
}

export class SparePartEntity {
	private constructor(
		public readonly definition: SparePartDefinition,
	) { }

	public static create(definition: SparePartDefinition) {
		return new SparePartEntity({
			...definition,
		});
	}
}
