import { DomainEntity, interfaceDomainEntity } from "..";
import { ManagerDefinition } from "../human/managerEntity";
import { NotificationDefinitionBase } from ".";

export interface ManagerNotificationDefinition extends NotificationDefinitionBase {
	managerId: ManagerDefinition["id"];
}

@interfaceDomainEntity
export class ManagerNotificationEntity extends DomainEntity<ManagerNotificationDefinition> {
	public static create(definition: Omit<ManagerNotificationDefinition, "date">) {
		return new ManagerNotificationEntity({
			...definition,
			date: new Date(),
		});
	}
}
