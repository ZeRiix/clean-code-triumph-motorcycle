import { InvalidQuantityStockError } from "domains/errors/stock/invalidQuantityStockError";

export class StockQuantityType {
    private constructor(value: number) { }

    public static from(value: number): StockQuantityType {
        if (!Boolean(value)) {
            throw new InvalidQuantityStockError(value);
        }

        return new StockQuantityType(value);
    }
}