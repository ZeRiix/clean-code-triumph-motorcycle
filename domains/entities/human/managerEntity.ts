import { Id, type FullName } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from "..";

export interface ManagerDefinition {
	id: Id;
	fullName: FullName;
}

@interfaceDomainEntity
export class ManagerEntity extends DomainEntity<ManagerDefinition> {
	public static create(definition: ManagerDefinition) {
		return new ManagerEntity({ ...definition });
	}
}
