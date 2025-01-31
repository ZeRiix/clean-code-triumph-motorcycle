import { type ManagerNotificationRepository } from "applications/repositories/managerNotificationRepository";
import { type ManagerEntity } from "domains/entities/human/managerEntity";
import { ManagerNotificationEntity, type ManagerNotificationDefinition } from "domains/entities/notification/managerNotificationEntity";

interface Dependences {
	managerNotificationRepository: ManagerNotificationRepository;
}

interface Params {
	managerNotification: Pick<
		ManagerNotificationDefinition,
		"message" | "priority" | "id"
	>;
	managerEntity: ManagerEntity;
}

export class CreateManagerNotificationUsecase {
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const managerNotification = ManagerNotificationEntity.create({
			...params.managerNotification,
			managerId: params.managerEntity.definition.id,
		});

		return dependences.managerNotificationRepository.save(managerNotification);
	}
}
