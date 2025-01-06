export class InvalidCostInterviewError extends Error {
    public constructor(public readonly cost: bigint) {
        super(`The cost ${cost} is invalid.`);
    }

    public override readonly name = "InvalidCostInterviewError";
    public override readonly message = `The cost is invalid. It must be a positive number.`;
}