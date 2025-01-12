import { Id, type PassedDate } from "domains/types/commonType";
import { type Incident } from "domains/types/incidentType";
import { DomainEntity, interfaceDomainEntity } from "..";
import { DriverDefinition } from "../human/driverEntity";

export interface IncidentDefinition {
	issue: Id;
	licenseNumberDriver: DriverDefinition["licenseNumber"];
	date: PassedDate;
	type: Incident;
	description: string | null;
}

@interfaceDomainEntity
export class IncidentEntity extends DomainEntity<IncidentDefinition> {
	public static create(definition: Omit<IncidentDefinition, "description">) {
		return new IncidentEntity({
			...definition,
			description: null,
		});
	}
}
