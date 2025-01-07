import { type PassedDateType } from "domains/types/common";
import { type Incident } from "domains/types/incident";
import { DomainEntity, interfaceDomainEntity } from ".";

export interface IncidentDefinition {
	date: PassedDateType;
	type: Incident;
	description: string | null;
}

@interfaceDomainEntity
export class IncidentEntity extends DomainEntity<IncidentDefinition> {
	public static create(definition: IncidentDefinition) {
		return new IncidentEntity({
			...definition,
		});
	}
}
