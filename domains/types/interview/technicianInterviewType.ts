export class TechnicianInterviewType {
    private constructor(
        public readonly name: string,
    ) { }

    public static create(name: string): TechnicianInterviewType {
        return new TechnicianInterviewType(name);
    }
}