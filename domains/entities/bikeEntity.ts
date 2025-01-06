/*
 *  Justification: The motorcycle is the central element of fleet management. 
 *      Each model has characteristics (model, type, mileage, date of entry into 
 *      circulation) which influence maintenance requirements, test 
 *      monitoring, and breakdowns.
*/
import type { MileageBikeType } from "domains/types/bike/mileageBikeType";
import type { PurchaseDateBikeType } from "domains/types/bike/purchaseDateBikeType";
import type { RegistrationBikeType } from "domains/types/bike/registrationBikeType";
import type { TypeBikeType } from "domains/types/bike/typeBikeType";
import type { YearBikeType } from "domains/types/bike/yearBikeType";

export interface BikeDefinition {
    registration: RegistrationBikeType; // unique search label AA-000-AA
    year: YearBikeType;
    type: TypeBikeType;
    mileage: MileageBikeType;
    purchaseDate: PurchaseDateBikeType;
    model?: string; // Optional because too complex to implement
    status?: boolean; // Optional because it is not necessary to create a motorcycle with status
}

export class BikeEntity {
    private constructor(
        public readonly definition: BikeDefinition,
    ) { }

    public static create(definition: BikeDefinition): BikeEntity {
        return new BikeEntity({
            ...definition,
            status: true, // default value is true because when a motorcycle is added it is not destroyed
        });
    }

    public updateMileage(newMileage: MileageBikeType): BikeEntity {
        return new BikeEntity({
            ...this.definition,
            mileage: newMileage,
        });
    }

    public desactivate(): BikeEntity {
        return new BikeEntity({
            ...this.definition,
            status: false,
        });
    }
}
