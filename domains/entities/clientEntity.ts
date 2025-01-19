import { DomainEntity, interfaceDomainEntity } from ".";
import { Siret } from "domains/types/companyType";

export interface ClientDefinition {
	siret: Siret;
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

