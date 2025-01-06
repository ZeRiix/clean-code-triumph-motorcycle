/*
 * Justification: Drivers using motorcycles must be monitored, particularly
 *      with regard to their profile (license, experience, history) and
 *      possible incidents.
*/

import { type PassedDateType, type FullName } from "domains/types/common";
import { type LicenseNumberDriver } from "domains/types/driver";

export interface DriverDefinition {
	name: FullName;
	licenseNumber: LicenseNumberDriver;
	licenseDateObtained: PassedDateType;
	birthdate: PassedDateType;
	status: boolean | null;
}

export class DriverEntity {
	private constructor(
		public readonly definition: Readonly<DriverDefinition>,
	) { }

	public static create(definition: Omit<DriverDefinition, "status">): DriverEntity {
		return new DriverEntity({
			...definition,
			status: true,
		});
	}

	public desactivate(): DriverEntity {
		return new DriverEntity({
			...this.definition,
			status: false,
		});
	}
}
