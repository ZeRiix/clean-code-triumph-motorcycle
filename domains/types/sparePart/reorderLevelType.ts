import { InvalidReorderLevelError } from "domains/errors/sparePart/invalidReorderLevelError";

const MIN_REORDER_LEVEL = 0;

export class ReorderLevelType {
    private constructor(public readonly value: number) { }

    public static from(reorderLevel: number): ReorderLevelType {
        if (reorderLevel < MIN_REORDER_LEVEL) {
            throw new InvalidReorderLevelError(reorderLevel);
        }

        return new ReorderLevelType(reorderLevel);
    }
}