import { type PassedDate, type FullName } from "domains/types/commonType";
import { type LicenseNumberDriver } from "domains/types/driverType";
import { DomainEntity, interfaceDomainEntity } from "..";

export interface DriverDefinition {
	fullName: FullName;
	licenseNumber: LicenseNumberDriver;
	licenseDateObtained: PassedDate;
	birthdate: PassedDate;
	status: boolean;
}

@interfaceDomainEntity
export class DriverEntity extends DomainEntity<DriverDefinition> {
	public static create(definition: Omit<DriverDefinition, "status">) {
		return new DriverEntity({
			...definition,
			status: true,
		});
	}
}
