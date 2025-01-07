import { type BikeRepository } from "applications/interfaces/repositories/bikeRepository";
import { type BikeDefinition } from "domains/entities/bikeEntity";

interface Dependences {
	bikeRepository: BikeRepository;
}

interface Params {
	bike: Pick<
		BikeDefinition,
		"factoryYear" | "mileage" | "model" | "purchaseDate" | "registration" | "type"
	>;
}

export class CreateBike {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const bike = await dependences.bikeRepository.create({
			registration: params.bike.registration,
			factoryYear: params.bike.factoryYear,
			type: params.bike.type,
			mileage: params.bike.mileage,
			purchaseDate: params.bike.purchaseDate,
			model: params.bike.model,
		});

		return bike;
	}
}
