import { type ClientNotificationRepository } from "applications/repositories/clientNotificationRepository";
import { type ClientEntity } from "domains/entities/clientEntity";
import { type ClientNotificationDefinition } from "domains/entities/notification/clientNotificationEntity";

interface Dependences {
	clientNotificationRepository: ClientNotificationRepository;
}

interface Params {
	clientNotification: Pick<
		ClientNotificationDefinition,
		"message" | "priority"
	>;
	clientEntity: ClientEntity;
}

export class CreateClientNotificationUsecase {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const { clientEntity, clientNotification } = params;

		const notification = await dependences.clientNotificationRepository.create({
			...clientNotification,
			clientSiret: clientEntity.definition.siret,
		});

		return notification;
	}
}
