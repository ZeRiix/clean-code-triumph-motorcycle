export class InvalidTypeInterviewError extends Error {
    public constructor(public readonly type: string) {
        super(`The type ${type} is invalid.`);
    }

    public override readonly name = "IvalidTypeInterviewError";
    public override readonly message = `The type is invalid. It must be preventive or curative.`;
}