import { type Siret } from "domains/types/companyType";
import { DomainEntity, interfaceDomainEntity } from ".";

export interface WarrantyDefinition {
	clientSiret: Siret;
	startDate: Date;
	endDate: Date;
	description: string | null;
}

@interfaceDomainEntity
export class WarrantyEntity extends DomainEntity<WarrantyDefinition> {
	public static create(definition: WarrantyDefinition) {
		return new WarrantyEntity({ ...definition });
	}
}
