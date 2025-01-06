import { BikeEntity } from "domains/entities/bikeEntity";

import type { BikeRepository } from "applications/interfaces/repositories/bikeRepository";

import { RegistrationBikeType } from "domains/types/bike/registrationBikeType";
import { YearBikeType } from "domains/types/bike/yearBikeType";
import { TypeBikeType } from "domains/types/bike/typeBikeType";
import { MileageBikeType } from "domains/types/bike/mileageBikeType";
import { PurchaseDateBikeType } from "domains/types/bike/purchaseDateBikeType";

export class CreateBikeUsecase {
    public constructor(
        private readonly bikeRepository: BikeRepository,
    ) {}

    public async execute(
        registration: string,
        year: number,
        type: string,
        mileage: number,
        purchaseDate: Date,
        model?: string,
    ) {
        const registrationBike = RegistrationBikeType.from(registration);

        if (registrationBike instanceof Error) {
            throw registrationBike;
        }

        const yearBike = YearBikeType.from(year);

        if (yearBike instanceof Error) {
            throw yearBike;
        }

        const typeBike = TypeBikeType.from(type);

        if (typeBike instanceof Error) {
            throw typeBike;
        }

        const mileageBike = MileageBikeType.from(mileage);

        if (mileageBike instanceof Error) {
            throw mileageBike;
        }

        const purchaseDateBike = PurchaseDateBikeType.from(purchaseDate, year);

        if (purchaseDateBike instanceof Error) {
            throw purchaseDateBike;
        }

        const bike = BikeEntity.create({
            registration: registrationBike,
            year: yearBike,
            type: typeBike,
            mileage: mileageBike,
            purchaseDate: purchaseDateBike,
            model,
        });

        await this.bikeRepository.create(bike.definition);
    }
}