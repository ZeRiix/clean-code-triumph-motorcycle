import { type Email } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from ".";
import { Siret } from "domains/types/companyType";

export interface ClientDefinition {
	siret: Siret;
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

