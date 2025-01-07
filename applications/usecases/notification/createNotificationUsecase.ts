import { type NotificationRepository } from "applications/interfaces/repositories/notificationRepository";
import { type NotificationDefinition } from "domains/entities/notificationEntity";

interface Dependences {
	notificationRepository: NotificationRepository;
}

interface Params {
	notificationParams: Pick<
		NotificationDefinition,
		"date" | "message" | "priority"
	>;
}

export class CreateNotificationUsecase {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const notification = await dependences.notificationRepository.create({
			...params.notificationParams,
		});

		return notification;
	}
}
