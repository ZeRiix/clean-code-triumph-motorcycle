import { ApplicationError } from "applications/errors";
import { type BikeEntity } from "domains/entities/bikeEntity";
import { type BikeModelEntity } from "domains/entities/bikeModelEntity";

interface Params {
	bikeEntity: BikeEntity;
	bikeModelEntity: BikeModelEntity;
}

export class MaintenanceDateIsPassedService {
	public static execute(
		params: Params,
	) {
		const { bikeEntity, bikeModelEntity } = params;

		if (bikeModelEntity.definition.name !== bikeEntity.definition.BikeModelName) {
			return new ApplicationError("bike-model-miss-match");
		}

		const comparedDate = new Date(bikeEntity.definition.lastInterviewDate);

		comparedDate.setDate(comparedDate.getDate() + bikeModelEntity.definition.interviewIntervalByDay.value);

		return comparedDate < new Date();
	}
}
