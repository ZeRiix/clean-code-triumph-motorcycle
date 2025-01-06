export class InvalidTypeBikeError extends Error {
    public constructor(public readonly type: string) {
        super(`The type ${type} is invalid.`);
    }

    public override readonly name = "InvalidTypeBikeError";
    public override readonly message = `The type is invalid. It must be one of the following: roadster, trail, sport, touring.`;
}
