import { type UnitPrice } from "domains/types/sparePartType";
import { type SparePartDefinition } from ".";
import { Id, type PositiveNumber } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from "..";
import { QuantityStock } from "../../types/stockType";

export interface SparePartCommandedDefinition {
	id: Id;
	orderDate: Date;
	reference: SparePartDefinition["reference"];
	unitPriceTTC: UnitPrice;
	quantity: QuantityStock;
	dayDeliveryDelay: PositiveNumber;
}

@interfaceDomainEntity
export class SparePartCommandedEntity extends DomainEntity<SparePartCommandedDefinition> {
	public static create(definition: Omit<SparePartCommandedDefinition, "orderDate">) {
		return new SparePartCommandedEntity({
			...definition,
			orderDate: new Date(),
		});
	}
}
