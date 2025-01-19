import { NotificationModel } from "@mongoose/notification";
import { type ManagerNotificationRepository } from "applications/repositories/managerNotificationRepository";

export const managerNotificationRepository: ManagerNotificationRepository = {
	async save(managerNotificationEntity) {
		await NotificationModel.updateOne(
			{
				"notification.id": managerNotificationEntity.definition.id,
			},
			{
				notification: {
					id: managerNotificationEntity.definition.id.value,
					date: managerNotificationEntity.definition.date,
					message: managerNotificationEntity.definition.message,
					priority: managerNotificationEntity.definition.priority.value,
					managerId: managerNotificationEntity.definition.managerId.value,
				},
			},
			{ upsert: true },
		);

		return managerNotificationEntity;
	},
};
