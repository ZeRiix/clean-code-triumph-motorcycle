import {
	type PriorityNotification,
} from "domains/types/notification";
import { DomainEntity, interfaceDomainEntity } from ".";

export interface NotificationDefinition {
	date: Date;
	message: string;
	priority: PriorityNotification;
}

@interfaceDomainEntity
export class NotificationEntity extends DomainEntity<NotificationDefinition> {
	public static create(definition: Omit<NotificationDefinition, "status">) {
		return new NotificationEntity({
			...definition,
		});
	}
}
