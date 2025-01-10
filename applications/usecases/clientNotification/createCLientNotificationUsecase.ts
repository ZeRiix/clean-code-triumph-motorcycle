import { type ClientNotificationRepository } from "applications/repositories/clientNotificationRepository";
import { type ClientEntity } from "domains/entities/clientEntity";
import { type ClientNotificationDefinition, ClientNotificationEntity } from "domains/entities/notification/clientNotificationEntity";

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
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const clientNotification = ClientNotificationEntity.create({
			...params.clientNotification,
			clientSiret: params.clientEntity.definition.siret,
		});

		return dependences.clientNotificationRepository.save(clientNotification);
	}
}
