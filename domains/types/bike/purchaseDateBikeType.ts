import { InvalidPurchaseDateBikeError } from "domains/errors/bike/invalidPurchaseDateBikeError";

const TODAY = new Date();

export class PurchaseDateBikeType {
    private constructor(public readonly value: Date) { }

    public static from(date: Date, year: number): PurchaseDateBikeType | InvalidPurchaseDateBikeError {
        if (date > TODAY || date.getFullYear() < year) {
            return new InvalidPurchaseDateBikeError(date, year);
        }

        return new PurchaseDateBikeType(date);
    }
}
