import { type ClientNotificationRepository } from "applications/repositories/clientNotificationRepository";
import { type ClientRepository } from "applications/repositories/clientRepository";
import { type BikeEntity } from "domains/entities/bikeEntity";
import { priorityNotificationType } from "domains/types/notificationType";
import { type BikeModelRepository } from "applications/repositories/bikeModelRepository";
import { type ManagerNotificationRepository } from "applications/repositories/managerNotificationRepository";
import { type ManagerRepository } from "applications/repositories/managerRepository";
import { MaintenanceDateIsPassedService } from "applications/services/bike/maintenanceDateIsPassed";
import { CreateClientNotificationUsecase } from "../client/createCLientNotificationUsecase";
import { SendNotifactionToManagersService } from "applications/services/manager/sendNotifactionToManagers";

interface Dependences {
	bikeModelRepository: BikeModelRepository;
	clientRepository: ClientRepository;
	clientNotificationRepository: ClientNotificationRepository;
	managerRepository: ManagerRepository;
	managerNotificationRepository: ManagerNotificationRepository;
}

interface Params {
	bikeEntity: BikeEntity;
}

export class SendNotificationForInterviewUsecase {
	private static priorityNotification = priorityNotificationType.createOrThrow("high");

	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const { bikeEntity } = params;

		const bikeModelEntity = await dependences.bikeModelRepository.getByBikeEntityOrThrow(bikeEntity);

		const dateIsPassed = MaintenanceDateIsPassedService.execute({
			bikeEntity,
			bikeModelEntity,
		});

		if (dateIsPassed instanceof Error) {
			return dateIsPassed;
		}

		if (!dateIsPassed) {
			return;
		}

		if (bikeModelEntity.definition.interviewIntervalByKillometers < bikeEntity.definition.mileage) {
			return;
		}

		const clientEntity = await dependences.clientRepository.getByBikeEntityOrThrow(bikeEntity);

		await CreateClientNotificationUsecase.execute(
			dependences,
			{
				clientNotification: {
					message: "",
					priority: this.priorityNotification,
				},
				clientEntity,
			},
		);

		await SendNotifactionToManagersService.execute(
			dependences,
			{
				managerNotification: {
					message: "",
					priority: this.priorityNotification,
				},
			},
		);
	}
}
