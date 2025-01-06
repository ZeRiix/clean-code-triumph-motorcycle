/*
 * Justification: Tests require specific management to assign a motorcycle 
 *      to a driver, track dates of use, and log incidents.
*/

import { RegistrationBikeType } from "domains/types/bike/registrationBikeType";

export interface TryDefinition {
    startDate: Date;
    endDate: Date;
    MotorcycleReference: RegistrationBikeType; // a vehicle already has a unique identification number
}

export class TryEntity {
    private constructor(
        public readonly definition: TryDefinition,
    ) { }

    public static create(definition: TryDefinition): TryEntity {
        return new TryEntity({
            ...definition,
        });
    }

    public extendTry(endDate: Date): TryEntity {
        return new TryEntity({
            ...this.definition,
            endDate,
        });
    }

    public reduceTry(endDate: Date): TryEntity {
        return new TryEntity({
            ...this.definition,
            endDate,
        });
    }
}