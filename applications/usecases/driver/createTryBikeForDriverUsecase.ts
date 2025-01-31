import { type BikeRepository } from "applications/repositories/bikeRepository";
import { type DriverHistoryRepository } from "applications/repositories/driverHistoryRepository";
import { type DriverRepository } from "applications/repositories/driverRepository";
import { type BikeEntity } from "domains/entities/bikeEntity";
import { DriverHistoryEntity, type DriverHistoryDefinition } from "domains/entities/bikeHistory/driverHistory";
import { type DriverEntity } from "domains/entities/human/driverEntity";

export interface Dependences {
	driverHistoryRepository: DriverHistoryRepository;
	DriverRepository: DriverRepository;
	BikeRepository: BikeRepository;
}

export interface Params {
	driverEntity: DriverEntity;
	bikeEntity: BikeEntity;
	driverHistoryParams: Pick<DriverHistoryDefinition, "startDate" | "endDate">;
}

export class CreateTryBikeForDriverUsecase {
	public static execute(dependences: Dependences, params: Params) {
		const driverHistory = DriverHistoryEntity.create({
			...params.driverHistoryParams,
			licenseNumberDriver: params.driverEntity.definition.licenseNumber,
			bikeVin: params.bikeEntity.definition.vin,
			try: false,
		});

		return dependences.driverHistoryRepository.save(driverHistory);
	}
}

