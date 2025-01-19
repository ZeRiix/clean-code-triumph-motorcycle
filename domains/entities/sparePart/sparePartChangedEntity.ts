import { PositiveNumber } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from "..";
import { type MaintenanceInterviewDefinition } from "../bikeHistory/maintenanceInterviewEntity";
import { type SparePartDefinition } from ".";

export interface SparePartChangedDefinition {
	quantity: PositiveNumber;
	reference: SparePartDefinition["reference"];
	maintenanceInterviewIssue: MaintenanceInterviewDefinition["issue"];
}

@interfaceDomainEntity
export class SparePartChangedEntity extends DomainEntity<SparePartChangedDefinition> {
	public static create(definition: SparePartChangedDefinition) {
		return new SparePartChangedEntity({
			...definition,
		});
	}
}
