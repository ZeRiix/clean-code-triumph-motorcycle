import {
	type PriorityNotification,
} from "domains/types/notification";

export interface NotificationDefinition {
	date: Date;
	message: string;
	priority: PriorityNotification;
}

export class NotificationEntity {
	private constructor(
		public readonly definition: NotificationDefinition,
	) { }

	public static create(definition: Omit<NotificationDefinition, "status">) {
		return new NotificationEntity({
			...definition,
		});
	}
}
