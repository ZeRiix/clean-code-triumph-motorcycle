export class InvalidNameError extends Error {
    public constructor(public readonly fullname: string) {
        super(`The name ${fullname} is invalid.`);
    }

    public override readonly name = "InvalidNameError";
    public override readonly message = `The name is invalid. It must contain only letters and a space between them.`;
}