import {
	statusNotificationType,
	type PriorityNotification,
	type StatusNotification,
} from "domains/types/notification";

export interface NotificationDefinition {
	date: Date;
	message: string;
	priority: PriorityNotification;
	status: StatusNotification;
}

export class NotificationEntity {
	public static defaultStatus = statusNotificationType.createOrThrow("pending");

	private constructor(
		public readonly definition: NotificationDefinition,
	) { }

	public static create(definition: Omit<NotificationDefinition, "status">) {
		return new NotificationEntity({
			...definition,
			status: NotificationEntity.defaultStatus,
		});
	}
}
