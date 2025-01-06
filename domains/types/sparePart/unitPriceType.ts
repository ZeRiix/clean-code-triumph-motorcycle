interface UnitPriceTypeInput {
    value: number;
    monneyType: "USD" | "EUR" | "GBP";
}

export class UnitPriceType {
    private constructor(public readonly value: UnitPriceTypeInput) { }

    public static from(unitPrice: UnitPriceTypeInput): UnitPriceType {
        return new UnitPriceType(unitPrice);
    }
}