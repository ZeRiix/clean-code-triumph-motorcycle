import { InvalidRegistrationBikeError } from "domains/errors/bike/invalidRegistrationBikeError";

const VALID_REGISTRATION_PATTERN = /^[A-Z]{2}-\d{3}-[A-Z]{2}/;

export class RegistrationBikeType {
    private constructor(public readonly value: string) { }

    public static from(registration: string): RegistrationBikeType | InvalidRegistrationBikeError {
        if (!VALID_REGISTRATION_PATTERN.test(registration)) {
            return new InvalidRegistrationBikeError(registration);
        }

        return new RegistrationBikeType(registration);
    }
}