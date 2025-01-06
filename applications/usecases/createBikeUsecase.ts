import { BikeEntity } from "domains/entities/bikeEntity";

import type { BikeRepository } from "applications/interfaces/repositories/bikeRepository";

import { checkValueObjects } from "domains/types";
import { factoryYearBikeType, mileageBikeType, purchaseDateBikeType, registrationBikeType, typeBikeType } from "domains/types/bike";

export class CreateBikeUsecase {
	public static async execute(
		dependence: {
			bikeRepository: BikeRepository;
		},
		params: {
			registration: string;
			factoryYearBike: number;
			typeBike: string;
			mileageBike: number;
			purchaseDate: Date;
			model: string | null;
		},
	) {
		const { success, data, error } = checkValueObjects({
			registrationBike: registrationBikeType.create(params.registration),
			factoryYearBike: factoryYearBikeType.create(params.factoryYearBike),
			typeBike: typeBikeType.create(params.typeBike),
			mileageBike: mileageBikeType.create(params.mileageBike),
			purchaseDateBike: purchaseDateBikeType.create(params.purchaseDate),
		});

		if (!success) {
			return error;
		}

		const {
			registrationBike,
			factoryYearBike,
			typeBike,
			mileageBike,
			purchaseDateBike,
		} = data;

		const bike = BikeEntity.create({
			registration: registrationBike,
			factoryYear: factoryYearBike,
			type: typeBike,
			mileage: mileageBike,
			purchaseDate: purchaseDateBike,
			model: params.model,
		});

		await dependence.bikeRepository.create(bike);
	}
}
