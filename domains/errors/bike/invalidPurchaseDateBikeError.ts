export class InvalidPurchaseDateBikeError extends Error {
    constructor(date: Date, year: number) {
        super(`Invalid purchase date: ${date} for year ${year}`);
    }

    override readonly name = "InvalidPurchaseDateBikeError";
    override readonly message = `The purchase date is invalid. It must be less than or equal to today and greater than or equal to the year of the bike.`;
}