/*
 * Justification: Automatic reminders and alerts (interviews to schedule,
 *      critical stock thresholds) require a business entity to manage
 *      their generation and sending.
*/

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

	public static create(definition: NotificationDefinition) {
		return new NotificationEntity({
			...definition,
			status: NotificationEntity.defaultStatus,
		});
	}
}
