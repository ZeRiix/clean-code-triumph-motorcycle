import { type PriorityNotification } from "domains/types/notificationType";

export interface NotificationDefinitionBase {
	date: Date;
	message: string;
	priority: PriorityNotification;
}
