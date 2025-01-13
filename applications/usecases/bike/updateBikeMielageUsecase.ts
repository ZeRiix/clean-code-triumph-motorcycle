import { type BikeModelRepository } from "applications/repositories/bikeModelRepository";
import { type BikeRepository } from "applications/repositories/bikeRepository";
import { type BikeDefinition, type BikeEntity } from "domains/entities/bikeEntity";
import { SendNotificationForInterviewUsecase } from "./sendNotificationForInterviewUsecase";
import { type ClientRepository } from "applications/repositories/clientRepository";
import { type ClientNotificationRepository } from "applications/repositories/clientNotificationRepository";
import { type ManagerRepository } from "applications/repositories/managerRepository";
import { type ManagerNotificationRepository } from "applications/repositories/managerNotificationRepository";

interface Dependence {
	bikeRepository: BikeRepository;
	bikeModelRepository: BikeModelRepository;
	clientRepository: ClientRepository;
	clientNotificationRepository: ClientNotificationRepository;
	managerRepository: ManagerRepository;
	managerNotificationRepository: ManagerNotificationRepository;
}

interface Params {
	bikeEntity: BikeEntity;
	newMileage: BikeDefinition["mileage"];
}

export class UpdateBikeMielageUsecase {
	public static async execute(
		dependence: Dependence,
		params: Params,
	) {
		const { newMileage, bikeEntity } = params;

		const updatedBikeEntity = bikeEntity.updateMileage(newMileage);

		if (updatedBikeEntity instanceof Error) {
			return updatedBikeEntity;
		}

		await dependence.bikeRepository.save(updatedBikeEntity);

		await SendNotificationForInterviewUsecase.execute(
			dependence,
			{
				bikeEntity,
			},
		);
	}
}
