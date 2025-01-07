import { type PassedDateType, type FullName } from "domains/types/common";
import { type LicenseNumberDriver } from "domains/types/driver";
import { DomainEntity, interfaceDomainEntity } from ".";

export interface DriverDefinition {
	name: FullName;
	licenseNumber: LicenseNumberDriver;
	licenseDateObtained: PassedDateType;
	birthdate: PassedDateType;
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
