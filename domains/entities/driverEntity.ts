import { type PassedDateType, type FullName } from "domains/types/common";
import { type LicenseNumberDriver } from "domains/types/driver";

export interface DriverDefinition {
	name: FullName;
	licenseNumber: LicenseNumberDriver;
	licenseDateObtained: PassedDateType;
	birthdate: PassedDateType;
	status: boolean;
}

export class DriverEntity {
	private constructor(
		public readonly definition: Readonly<DriverDefinition>,
	) { }

	public static create(definition: Omit<DriverDefinition, "status">) {
		return new DriverEntity({
			...definition,
			status: true,
		});
	}
}
