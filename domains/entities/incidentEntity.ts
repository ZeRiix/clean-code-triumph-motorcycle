import { type PassedDate } from "domains/types/commonType";
import { type Incident } from "domains/types/incidentType";
import { DomainEntity, interfaceDomainEntity } from ".";
import { LicenseNumberDriver } from "domains/types/driverType";

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
