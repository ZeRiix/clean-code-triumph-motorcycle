/*
 * Justification: Drivers using motorcycles must be monitored, particularly 
 *      with regard to their profile (license, experience, history) and 
 *      possible incidents.
*/

import type { NameType } from "domains/types/common/nameType";
import type { LicenseNumberDriverType } from "domains/types/driver/licenseNumberDriverType";

export interface DriverDefinition {
    name: NameType; // Full name of the driver
    licenseNumber: LicenseNumberDriverType; // Unique identifier for the driver’s license
    licenseDateObtained: Date; // Date when the driver obtained the license
    birthdate: Date // Driver's date of birth
    status?: boolean;
}

export class DriverEntity {
    private constructor(
        public readonly definition: DriverDefinition,
    ) { }

    public static create(definition: DriverDefinition): DriverEntity {
        return new DriverEntity({
            ...definition,
            status: true, // default
        });
    }

    // if can change if he loses his license or change identity
    public static updateFriverProfile(
        definition: DriverDefinition,
        newName: NameType,
        newLicenseNumber: LicenseNumberDriverType,
        newLicenseDateObtained: Date,
        newBirthdate: Date,
    ): DriverEntity {
        return new DriverEntity({
            ...definition,
            name: newName,
            licenseNumber: newLicenseNumber,
            licenseDateObtained: newLicenseDateObtained,
            birthdate: newBirthdate,
        });
    }

    // if the driver changes his name or is died
    public desactivate(): DriverEntity {
        return new DriverEntity({
            ...this.definition,
            status: false,
        });
    }
}
