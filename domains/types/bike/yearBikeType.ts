import { InvalidYearBikeError } from "domains/errors/bike/invalidYearBikeError";

const CURRENT_YEAR = new Date().getFullYear();
const MIN_YEAR = 1900;

export class YearBikeType {
    private constructor(public readonly value: number) { }

    public static from(year: number): YearBikeType | InvalidYearBikeError {
        if (year < MIN_YEAR || year > CURRENT_YEAR) {
            return new InvalidYearBikeError(year);
        }

        return new YearBikeType(year);
    }
}
