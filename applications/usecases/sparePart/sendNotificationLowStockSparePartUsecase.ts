import { type ManagerNotificationRepository } from "applications/repositories/managerNotificationRepository";
import { type SparePartEntity } from "domains/entities/sparePart";
import { SendNotifactionToManagersService } from "applications/services/manager/sendNotifactionToManagers";
import { priorityNotificationType } from "domains/types/notificationType";
import { type ManagerRepository } from "applications/repositories/managerRepository";

interface Dependences {
	managerRepository: ManagerRepository;
	managerNotificationRepository: ManagerNotificationRepository;
}

interface Params {
	sparePartEntity: SparePartEntity;
}

export class SendNotificationLowStockSparePartUsecase {
	private static priorityNotification = priorityNotificationType.createOrThrow("high");

	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const { sparePartEntity } = params;

		if (!sparePartEntity.stockLessThanReorderLevel()) {
			return;
		}

		return SendNotifactionToManagersService.execute(
			dependences,
			{
				managerNotification: {
					priority: this.priorityNotification,
					message: "",
				},
			},
		);
	}
}
