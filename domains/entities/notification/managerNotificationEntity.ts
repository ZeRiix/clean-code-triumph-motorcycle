import { DomainEntity, interfaceDomainEntity } from "..";
import { ManagerDefinition } from "../managerEntity";
import { NotificationDefinitionBase } from ".";

export interface ManagerNotificationDefinition extends NotificationDefinitionBase {
	managerSocialSecurityNumber: ManagerDefinition["socialSecurityNumber"];
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
