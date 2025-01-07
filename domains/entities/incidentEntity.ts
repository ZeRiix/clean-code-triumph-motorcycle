import { type PassedDate } from "domains/types/common";
import { type Incident } from "domains/types/incident";
import { DomainEntity, interfaceDomainEntity } from ".";
import { LicenseNumberDriver } from "domains/types/driver";

export interface IncidentDefinition {
	licenseNumberDriver: LicenseNumberDriver;
	date: PassedDate;
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
