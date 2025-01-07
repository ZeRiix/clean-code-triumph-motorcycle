import { type BikeRepository } from "applications/interfaces/bikeRepository";
import { type BikeDefinition } from "domains/entities/bikeEntity";
import { type BikeModelEntity } from "domains/entities/bikeModelEntity";

interface Dependences {
	bikeRepository: BikeRepository;
}

interface Params {
	bike: Pick<
		BikeDefinition,
		"factoryYear" | "mileage" | "purchaseDate" | "registration"
	>;
	bikeModel: BikeModelEntity;
}

export class CreateBike {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const bike = await dependences.bikeRepository.create({
			...params.bike,
			BikeModelName: params.bikeModel.definition.name,
		});

		return bike;
	}
}
