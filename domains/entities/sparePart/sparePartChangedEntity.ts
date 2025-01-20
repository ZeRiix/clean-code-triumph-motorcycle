import { Id, PositiveNumber } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from "..";
import { type MaintenanceInterviewDefinition } from "../bikeHistory/maintenanceInterviewEntity";
import { type SparePartDefinition } from ".";

export interface SparePartChangedDefinition {
	id: Id;
	quantity: PositiveNumber;
	reference: SparePartDefinition["reference"];
	maintenanceInterviewIssue: MaintenanceInterviewDefinition["issue"];
	date: Date;
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
