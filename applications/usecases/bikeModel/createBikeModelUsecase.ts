import { type BikeModelRepository } from "applications/repositories/bikeModelRepository";
import { type BikeModelDefinition } from "domains/entities/bikeModelEntity";

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
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const bikeModel = await dependences.bikeModelRepository.create({
			...params.bikeModel,
		});

		return bikeModel;
	}
}
