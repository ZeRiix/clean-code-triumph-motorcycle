export class InvalidPartReferenceError extends Error {
    public constructor(public readonly sku: string) {
        super(`The part reference ${sku} is invalid.`);
    }

    public override readonly name = "InvalidPartReferenceError";
    public override readonly message = `The part reference is invalid. It must contain only letters and numbers and be between 1 and 20 characters long.`;
}