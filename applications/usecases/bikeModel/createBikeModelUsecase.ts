import { type BikeModelRepository } from "applications/repositories/bikeModelRepository";
import { type BikeModelDefinition, BikeModelEntity } from "domains/entities/bikeModelEntity";

interface Dependences {
	bikeModelRepository: BikeModelRepository;
}

interface Params {
	bikeModel: Pick<
		BikeModelDefinition,
		"name" | "type" | "interviewIntervalByKillometers" | "interviewIntervalByDay"
	>;
}

export class CreateBikeModel {
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const bikeModel = BikeModelEntity.create({
			...params.bikeModel,
		});

		return dependences.bikeModelRepository.save(bikeModel);
	}
}
