export enum StatusEnum {
    PENDING = "pending",
    READ = "read",
    DELETED = "deleted",
}

export class StatusType {
    private constructor(public readonly value: StatusEnum) { }

    public static from(status: StatusEnum): StatusType {
        return new StatusType(status);
    }
}