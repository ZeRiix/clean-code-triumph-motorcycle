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
	private constructor(
		public readonly definition: NotificationDefinition,
	) { }

	public static create(definition: NotificationDefinition): NotificationEntity {
		return new NotificationEntity({
			...definition,
		});
	}

	// template method
	private updateStatus(status: StatusNotification): NotificationEntity {
		return new NotificationEntity({
			...this.definition,
			status,
		});
	}

	public readNotification(): NotificationEntity {
		return this.updateStatus(statusNotificationType.createOrThrow("read"));
	}

	public resetStatus(): NotificationEntity {
		return this.updateStatus(statusNotificationType.createOrThrow("pending"));
	}

	public deleteNotification(): NotificationEntity {
		return this.updateStatus(statusNotificationType.createOrThrow("deleted"));
	}
}
