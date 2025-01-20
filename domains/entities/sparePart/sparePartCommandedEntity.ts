import { type UnitPrice } from "domains/types/sparePartType";
import { type SparePartDefinition } from ".";
import { Id, type PositiveNumber } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from "..";

export interface SparePartCommandedDefinition {
	id: Id;
	date: Date;
	reference: SparePartDefinition["reference"];
	unitPriceTTC: UnitPrice;
	quantity: PositiveNumber;
	dayDeliveryDelay: PositiveNumber;
}

@interfaceDomainEntity
export class SparePartCommandedEntity extends DomainEntity<SparePartCommandedDefinition> {
	public static create(definition: SparePartCommandedDefinition) {
		return new SparePartCommandedEntity({
			...definition,
		});
	}
}
