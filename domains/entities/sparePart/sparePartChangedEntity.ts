import { PositiveNumber } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from "..";
import { type MaintenanceInterviewDefinition } from "../bikeHistory/maintenanceInterviewEntity";
import { type SparePartDefinition } from ".";

export interface SparePartChangedDefinition {
	date: Date;
	quantity: PositiveNumber;
	sparePartReference: SparePartDefinition["reference"];
	maintenanceInterviewIssue: MaintenanceInterviewDefinition["issue"];
}

@interfaceDomainEntity
export class SparePartChangedEntity extends DomainEntity<SparePartChangedDefinition> {
	public static create(definition: Omit<SparePartChangedDefinition, "date">) {
		return new SparePartChangedEntity({
			...definition,
			date: new Date(),
		});
	}
}
