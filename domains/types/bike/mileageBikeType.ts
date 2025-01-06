import { NegativeMileageBikeError } from "domains/errors/bike/negativeMileageBikeError";

const MIN_MILEAGE = 0;

export class MileageBikeType {
    private constructor(public readonly value: number) { }

    public static from(mileage: number): MileageBikeType | NegativeMileageBikeError {
        if (mileage < MIN_MILEAGE) {
            return new NegativeMileageBikeError(mileage);
        }

        return new MileageBikeType(mileage);
    }
}
