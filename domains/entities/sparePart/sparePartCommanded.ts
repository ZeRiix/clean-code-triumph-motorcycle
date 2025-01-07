import { type UnitPrice } from "domains/types/sparePartType";
import { type SparePartDefinition } from ".";
import { type PositiveNumber } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from "..";

export interface SparePartCommandedDefinition {
	reference: SparePartDefinition["reference"];
	unitPriceTTC: UnitPrice;
	quantity: PositiveNumber;
}

@interfaceDomainEntity
export class SparePartCommandedEntity extends DomainEntity<SparePartCommandedDefinition> {
	public static create(definition: SparePartCommandedDefinition) {
		return new SparePartCommandedEntity({
			...definition,
		});
	}
}
