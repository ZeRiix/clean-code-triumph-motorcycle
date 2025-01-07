import { type PassedDate } from "domains/types/commonType";
import { type Incident } from "domains/types/incidentType";
import { DomainEntity, interfaceDomainEntity } from ".";
import { DriverDefinition } from "./driverEntity";

export interface IncidentDefinition {
	licenseNumberDriver: DriverDefinition["licenseNumber"];
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
