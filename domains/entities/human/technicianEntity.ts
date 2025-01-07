import { type SocialSecurityNumber, type FullName } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from "..";

export interface TechnicianDefinition {
	FullName: FullName;
	socialSecurityNumber: SocialSecurityNumber;
}

@interfaceDomainEntity
export class TechnicianEntity extends DomainEntity<TechnicianDefinition> {
	public static create(definition: TechnicianDefinition) {
		return new TechnicianEntity({ ...definition });
	}
}
