import { InvalidTypeInterviewError } from "domains/errors/interview/invalidTypeInterviewError";

enum INTERVIIW_TYPE {
    preventive = 'preventive',
    curative = 'curative',
}

const INTERVIIW_TYPE_MAPPER = {
    preventive: 'preventive',
    curative: 'curative',
};

export class TypeInterviewType {
    private constructor(
        public readonly value: string,
    ) { }

    public static from(value: INTERVIIW_TYPE): TypeInterviewType {
        if (INTERVIIW_TYPE_MAPPER[value] === undefined) {
            throw new InvalidTypeInterviewError(value);

        }
        return new TypeInterviewType(value);
    }
}