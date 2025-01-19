import { type PriorityNotification } from "domains/types/notificationType";
import { type Id } from "../../types/commonType";

export interface NotificationDefinitionBase {
	id: Id;
	date: Date;
	message: string;
	priority: PriorityNotification;
}
