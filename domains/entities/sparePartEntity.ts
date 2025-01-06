/*
 * Justification: Spare parts are essential for maintenance. Managing 
 *     inventory, alerts, and order history is a crucial business 
 *     functionality.
*/
import type { PartReferenceType } from "domains/types/sparePart/partReferenceType";
import { StockQuantityType } from "domains/types/stock/quantityStockType";
import type { ReorderLevelType } from "domains/types/sparePart/reorderLevelType";
import type { UnitPriceType } from "domains/types/sparePart/unitPriceType";

const DEFAULT_STOCK = 0;

export interface SparePartDefinition {
    reference: PartReferenceType; // sku
    name: string; // piece name
    stock: StockQuantityType;
    reorderLevel: ReorderLevelType;
    unitPriceTTC?: UnitPriceType;
}

export class SparePartEntity {
    private constructor(
        public readonly definition: SparePartDefinition,
    ) { }

    public static create(definition: SparePartDefinition): SparePartEntity {
        return new SparePartEntity({
            ...definition,
            stock: definition.stock || StockQuantityType.from(DEFAULT_STOCK),
        });
    }

    public updateStock(quantity: StockQuantityType): SparePartEntity {
        return new SparePartEntity({
            ...this.definition,
            stock: quantity,
        });
    }
}
