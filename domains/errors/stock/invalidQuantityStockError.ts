export class InvalidQuantityStockError extends Error {
    public constructor(public readonly value: number) {
        super(`The quantity ${value} is invalid.`);
    }

    public override readonly name = "InvalidQuantityStockError";
    public override readonly message = "The quantity is invalid. It must be a positive number.";
}