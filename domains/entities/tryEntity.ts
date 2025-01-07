import { DomainEntity, interfaceDomainEntity } from ".";
import { BikeDefinition } from "./bikeEntity";
import { DriverDefinition } from "./human/driverEntity";

export interface TryDefinition {
	startDate: Date;
	endDate: Date;
	bikeRegistration: BikeDefinition["registration"];
	driverLicenceNumber: DriverDefinition["licenseNumber"];
}

@interfaceDomainEntity
export class TryEntity extends DomainEntity<TryDefinition> {
	public static create(definition: TryDefinition) {
		return new TryEntity({
			...definition,
		});
	}
}
