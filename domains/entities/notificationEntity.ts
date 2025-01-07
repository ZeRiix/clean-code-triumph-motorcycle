import {
	type PriorityNotification,
} from "domains/types/notificationType";
import { DomainEntity, interfaceDomainEntity } from ".";

export interface NotificationDefinition {
	date: Date;
	message: string;
	priority: PriorityNotification;
}

@interfaceDomainEntity
export class NotificationEntity extends DomainEntity<NotificationDefinition> {
	public static create(definition: NotificationDefinition) {
		return new NotificationEntity({
			...definition,
		});
	}
}
