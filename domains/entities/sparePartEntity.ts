/*
 * Justification: Spare parts are essential for maintenance. Managing
 *     inventory, alerts, and order history is a crucial business
 *     functionality.
*/

import {
	type ReorderLevel,
	type PartReference,
	type UnitPrice,
} from "domains/types/sparePart";
import { quantityStockType, type QuantityStock } from "domains/types/stock";

const DEFAULT_STOCK = 0;

export interface SparePartDefinition {
	reference: PartReference;
	name: string;
	stock: QuantityStock;
	reorderLevel: ReorderLevel;
	unitPriceTTC: UnitPrice;
}

export class SparePartEntity {
	public static defaultStock = quantityStockType.createOrThrow(DEFAULT_STOCK);

	private constructor(
		public readonly definition: SparePartDefinition,
	) { }

	public static create(definition: SparePartDefinition) {
		return new SparePartEntity({
			...definition,
			stock: definition.stock || this.defaultStock,
		});
	}

	public updateStock(quantity: QuantityStock) {
		return new SparePartEntity({
			...this.definition,
			stock: quantity,
		});
	}
}
