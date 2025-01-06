export class InvalidReorderLevelError extends Error {
    public constructor(public readonly reorderLevel: number) {
        super(`The reorder level ${reorderLevel} is invalid.`);
    }

    public override readonly name = "InvalidReorderLevelError";
    public override readonly message = `The reorder level is invalid. It must be a positive number.`;
}