import { InvalidCostInterviewError } from "domains/errors/interview/invalidCostInterviewError";

export class CostInterviewType {
    private constructor(public readonly value: bigint) { }

    public static from(cost: bigint): CostInterviewType {
        if (Boolean(cost) === false) {
            throw new InvalidCostInterviewError(cost);
        }

        return new CostInterviewType(cost);
    }
}