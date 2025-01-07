import type { BikeRepository } from "applications/interfaces/repositories/bikeRepository";

import { type FactoryYearBike, type MileageBike, type PurchaseDateBike, type RegistrationBike, type TypeBike } from "domains/types/bike";

export class CreateBikeUsecase {
	public static async execute(
		dependence: {
			bikeRepository: BikeRepository;
		},
		params: {
			registrationBike: RegistrationBike;
			factoryYearBike: FactoryYearBike;
			typeBike: TypeBike;
			mileageBike: MileageBike;
			purchaseDateBike: PurchaseDateBike;
			modelBike: string | null;
		},
	) {
		const bike = await dependence.bikeRepository.create({
			registration: params.registrationBike,
			factoryYear: params.factoryYearBike,
			type: params.typeBike,
			mileage: params.mileageBike,
			purchaseDate: params.purchaseDateBike,
			model: params.modelBike,
		});

		return bike;
	}
}
