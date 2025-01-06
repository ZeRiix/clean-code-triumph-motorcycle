export enum PriorityEnum {
    LOW = "low",
    NORMAL = "normal",
    HIGH = "high",
}

export class PriorityType {
    private constructor(public readonly value: PriorityEnum) { }

    public static from(priority: PriorityEnum): PriorityType {
        return new PriorityType(priority);
    }
}