

export enum IncidentEnum {
    ACCIDENT = "accident",
    BREAKDOWN = "breakdown",
    FLAT_TIRE = "flat tire",
    OUT_OF_GAS = "out of gas",
    OTHER = "other",
}

export class IncidentType {
    private constructor(
        public readonly type: IncidentEnum,
    ) { }

    public static from(type: IncidentEnum): IncidentType {
        return new IncidentType(type);
    }
}