import { InvalidLicenseNumberDriverError } from "domains/errors/driver/invalidLicenseNumberDriverError";

const LICENSE_NUMBER_DRIVER_REGEX = /\b[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|1[0-9]|2A|2a|2B|2b|2[1-9]|[3-8][0-9]|9[0-5])[0-9]{6}\b/;

export class LicenseNumberDriverType {
    private constructor(public readonly value: string) { }

    public static from(licenseNumber: string): LicenseNumberDriverType {
        if (!LICENSE_NUMBER_DRIVER_REGEX.test(licenseNumber)) {
            throw new InvalidLicenseNumberDriverError(licenseNumber);
        }

        return new LicenseNumberDriverType(licenseNumber);
    }
}