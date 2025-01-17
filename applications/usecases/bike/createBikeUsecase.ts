import { type BikeRepository } from "applications/repositories/bikeRepository";
import { type BikeDefinition, BikeEntity } from "domains/entities/bikeEntity";
import { type BikeModelEntity } from "domains/entities/bikeModelEntity";

interface Dependences {
	bikeRepository: BikeRepository;
}

interface Params {
	bike: Pick<
		BikeDefinition,
		"factoryYear" | "mileage" | "purchaseDate" | "registration" | "vin" | "lastInterviewDate"
	>;
	bikeModel: BikeModelEntity;
}

export class CreateBike {
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const bike = BikeEntity.create({
			...params.bike,
			modelName: params.bikeModel.definition.name,
		});

		return dependences.bikeRepository.save(bike);
	}
}
