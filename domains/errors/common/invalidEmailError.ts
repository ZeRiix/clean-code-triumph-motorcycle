export class InvalidEmailError extends Error {
    public constructor(public readonly email: string) {
        super(`The email ${email} is invalid.`);
    }

    public override readonly name = "InvalidEmailError";
    public override readonly message = `The email is invalid. It must contain a valid email format.`;
}