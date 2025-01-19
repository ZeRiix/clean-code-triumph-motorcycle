import { DomainEntity, interfaceDomainEntity } from "..";
import { type BikeDefinition } from "../bikeEntity";
import { type DriverDefinition } from "../human/driverEntity";

export interface DriverHistoryDefinition {
	licenseNumberDriver: DriverDefinition["licenseNumber"];
	bikeVin: BikeDefinition["vin"];
	startDate: Date;
	endDate: Date | null;
	try: boolean;
}

@interfaceDomainEntity
export class DriverHistoryEntity extends DomainEntity<DriverHistoryDefinition> {
	public static create(definition: DriverHistoryDefinition) {
		return new DriverHistoryEntity({
			...definition,
		});
	}
}
