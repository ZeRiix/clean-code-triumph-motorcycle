export class InvalidYearBikeError extends Error {

    public constructor(public readonly year: number) {
        super(`The year ${year} is invalid.`);
    }

    public override readonly name = "InvalidYearBikeError";
    public override readonly message = `The year is invalid. It must be greater than or equal to 1900.`;
}
