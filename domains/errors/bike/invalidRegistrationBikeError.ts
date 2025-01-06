export class InvalidRegistrationBikeError extends Error {
    constructor(registration: string) {
        super(`The registration ${registration} is invalid`);
    }

    public override readonly name = "InvalidRegistrationBikeError";
    public override readonly message = `The registration is invalid. It must follow the pattern: XX-999-XX`;
}