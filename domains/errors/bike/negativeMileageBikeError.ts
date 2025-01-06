export class NegativeMileageBikeError extends Error {
    public constructor(public readonly mileage: number) {
        super(`The mileage ${mileage} is invalid.`);
    }

    public override readonly name = "NegativeMileageBikeError";
    public override readonly message = `The mileage is invalid. It must be greater than or equal to 0.`;
}