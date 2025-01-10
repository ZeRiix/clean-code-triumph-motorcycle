import { type ClientNotificationRepository } from "applications/repositories/clientNotificationRepository";
import { type ClientRepository } from "applications/repositories/clientRepository";
import { type BikeEntity } from "domains/entities/bikeEntity";
import { priorityNotificationType } from "domains/types/notificationType";
import { CreateClientNotificationUsecase } from "../clientNotification/createClientNotificationUsecase";

interface Dependences {
	clientNotificationRepository: ClientNotificationRepository;
	clientRepository: ClientRepository;
}

interface Params {
	bikeEntity: BikeEntity;
}

export class SendNotificationIfInterviewMileageIsExceedUsecase {
	private static priorityNotification = priorityNotificationType.createOrThrow("high");

	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const { bikeEntity } = params;

		if (!bikeEntity.definition.interviewAtMileage) {
			return;
		}

		if (bikeEntity.definition.interviewAtMileage.value > bikeEntity.definition.mileage.value) {
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
	}
}
