import { DomainEntity, interfaceDomainEntity } from "..";
import { ClientDefinition } from "../clientEntity";
import { NotificationDefinitionBase } from ".";

export interface ClientNotificationDefinition extends NotificationDefinitionBase {
	clientSiret: ClientDefinition["siret"];
}

@interfaceDomainEntity
export class ClientNotificationEntity extends DomainEntity<ClientNotificationDefinition> {
	public static create(definition: Omit<ClientNotificationDefinition, "date">) {
		return new ClientNotificationEntity({
			...definition,
			date: new Date(),
		});
	}
}
