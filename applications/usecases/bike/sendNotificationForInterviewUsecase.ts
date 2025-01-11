import { type ClientNotificationRepository } from "applications/repositories/clientNotificationRepository";
import { type ClientRepository } from "applications/repositories/clientRepository";
import { type BikeEntity } from "domains/entities/bikeEntity";
import { priorityNotificationType } from "domains/types/notificationType";
import { CreateClientNotificationUsecase } from "../clientNotification/createClientNotificationUsecase";
import { type BikeModelRepository } from "applications/repositories/bikeModelRepository";
import { type ManagerNotificationRepository } from "applications/repositories/managerNotificationRepository";
import { type ManagerRepository } from "applications/repositories/managerRepository";
import { CreateManagerNotificationUsecase } from "../managerNotification/createManagerNotificationUsecase";

interface Dependences {
	// bike
	bikeModelRepository: BikeModelRepository;
	// client
	clientRepository: ClientRepository;
	clientNotificationRepository: ClientNotificationRepository;
	// manager
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

		/**
		 * Check if the bike needs maintenance
		 */

		if (bikeModelEntity.definition.interviewIntervalByKillometers < bikeEntity.definition.mileage) {
			return;
		}

		if (!bikeModelEntity.isMaintenanceDatePassed(bikeEntity)) {
			return;
		}

		/**
		 * Send notification to client and manager
		 */

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

		const managerEntities = await dependences.managerRepository.getAllManager();

		await Promise.all(
			managerEntities.map((managerEntity) => CreateManagerNotificationUsecase.execute(
				dependences,
				{
					managerNotification: {
						message: "",
						priority: this.priorityNotification,
					},
					managerEntity,
				},
			)),
		);
	}
}
