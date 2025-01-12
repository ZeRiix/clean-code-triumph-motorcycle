import { type ManagerNotificationRepository } from "applications/repositories/managerNotificationRepository";
import { type ManagerRepository } from "applications/repositories/managerRepository";
import { CreateManagerNotificationUsecase } from "applications/usecases/manager/createManagerNotificationUsecase";
import { type ManagerNotificationDefinition } from "domains/entities/notification/managerNotificationEntity";

interface Dependences {
	managerRepository: ManagerRepository;
	managerNotificationRepository: ManagerNotificationRepository;
}

interface Params {
	managerNotification: Pick<
		ManagerNotificationDefinition,
		"message" | "priority"
	>;
}

export class SendNotifactionToManagersService {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const managerEntities = await dependences.managerRepository.getAllManager();

		await Promise.all(
			managerEntities.map(
				(managerEntity) => CreateManagerNotificationUsecase.execute(
					dependences,
					{
						managerNotification: params.managerNotification,
						managerEntity,
					},
				),
			),
		);

		return;
	}
}
