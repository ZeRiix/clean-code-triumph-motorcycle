export class InvalidLicenseNumberDriverError extends Error {
    public constructor(public readonly licenseNumber: string) {
        super(`The license number ${licenseNumber} is invalid.`);
    }

    public override readonly name = "InvalidLicenseNumberDriverError";
    public override readonly message = `The license number is invalid. It must contain only letters and numbers.`;
}