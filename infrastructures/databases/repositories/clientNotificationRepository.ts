import { NotificationModel, type notificationSchema } from "@mongoose/notification";
import { type ClientNotificationRepository } from "applications/repositories/clientNotificationRepository";
import { type z } from "zod";

export const clientNotificationRepository: ClientNotificationRepository = {
	async save(clientNotificationEntity) {
		await NotificationModel.updateOne(
			{
				"notification.id": clientNotificationEntity.definition.id,
			},
			{
				notification: {
					id: clientNotificationEntity.definition.id.value,
					date: clientNotificationEntity.definition.date,
					message: clientNotificationEntity.definition.message,
					priority: clientNotificationEntity.definition.priority.value,
					clientSiret: clientNotificationEntity.definition.clientSiret.value,
				} satisfies z.infer<typeof notificationSchema>,
			},
			{ upsert: true },
		);

		return clientNotificationEntity;
	},
};
