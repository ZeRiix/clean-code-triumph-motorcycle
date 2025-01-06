import { InvalidNameError } from "domains/errors/common/invalidNameError";

const NAME_REGEX = /^[a-zA-Z]+ [a-zA-Z]+$/;

export class NameType {
    private constructor(public readonly value: string) { }

    public static from(fullname: string): NameType {
        if (!NAME_REGEX.test(fullname)) {
            throw new InvalidNameError(fullname);
        }

        return new NameType(fullname);
    }
}