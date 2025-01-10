import { type FullName, Id } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from "..";

export interface TechnicianDefinition {
	id: Id;
	FullName: FullName;
}

@interfaceDomainEntity
export class TechnicianEntity extends DomainEntity<TechnicianDefinition> {
	public static create(definition: TechnicianDefinition) {
		return new TechnicianEntity({ ...definition });
	}
}
