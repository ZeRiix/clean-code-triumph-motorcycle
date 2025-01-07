import { DomainEntity, interfaceDomainEntity } from ".";

export interface WarrantyDefinition {
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
