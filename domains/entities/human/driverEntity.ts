import { type PassedDate } from "domains/types/commonType";
import { type LicenseNumberDriver } from "domains/types/driverType";
import { interfaceDomainEntity } from "..";
import { UserDefinition, UserEntity } from "./userEntity";

export interface DriverDefinition extends UserDefinition {
	licenseNumber: LicenseNumberDriver;
	licenseDateObtained: PassedDate;
	birthdate: PassedDate;
	status: boolean;
}

@interfaceDomainEntity
export class DriverEntity extends UserEntity<DriverDefinition> {
	public static create(definition: Omit<DriverDefinition, "status">) {
		return new DriverEntity({
			...definition,
			status: true,
		});
	}
}
