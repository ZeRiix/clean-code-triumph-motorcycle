import { type Email, type FullName } from "domains/types/common";
import { DomainEntity, interfaceDomainEntity } from ".";

export interface ClientDefinition {
	siret: FullName;
	email: Email | null;
	phone: string | null;
	address: string | null;
	isPartner: boolean;
}

@interfaceDomainEntity
export class ClientEntity extends DomainEntity<ClientDefinition> {
	public static create(definition: Omit<ClientDefinition, "isPartner">) {
		return new ClientEntity({
			...definition,
			isPartner: true,
		});
	}
}

