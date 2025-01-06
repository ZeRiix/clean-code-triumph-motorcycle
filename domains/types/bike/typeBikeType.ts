import { InvalidTypeBikeError } from "domains/errors/bike/invalidTypeBikeError";

const VALID_TYPES = ["roadster", "trail", "sport", "touring"];

export class TypeBikeType {
    private constructor(public readonly value: string) { }

    public static from(type: string): TypeBikeType | InvalidTypeBikeError {

        if (!VALID_TYPES.includes(type)) {
            return new InvalidTypeBikeError(type);
        }

        return new TypeBikeType(type);
    }
}
