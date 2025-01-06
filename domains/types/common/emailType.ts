import { InvalidEmailError } from "domains/errors/common/invalidEmailError";

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export class EmailType {
    private constructor(public readonly value: string) { }

    public static from(email: string): EmailType {
        if (!EMAIL_REGEX.test(email)) {
            throw new InvalidEmailError(email);
        }

        return new EmailType(email);
    }
}