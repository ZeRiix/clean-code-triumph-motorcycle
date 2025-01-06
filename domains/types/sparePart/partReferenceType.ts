import { InvalidPartReferenceError } from "domains/errors/sparePart/invalidPartReferenceError";

const SKU_PATTERN = /^[a-zA-Z0-9]{1,20}$/;

export class PartReferenceType {
    private constructor(public readonly value: string) { }

    public static from(sku: string): PartReferenceType {
        if (!SKU_PATTERN.test(sku)) {
            throw new InvalidPartReferenceError(sku);
        }

        return new PartReferenceType(sku);
    }
}