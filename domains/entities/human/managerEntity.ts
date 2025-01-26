import { interfaceDomainEntity } from "..";
import { UserDefinition, UserEntity } from "./userEntity";

export interface ManagerDefinition extends UserDefinition {

}

@interfaceDomainEntity
export class ManagerEntity extends UserEntity<ManagerDefinition> {
	public static create(definition: ManagerDefinition) {
		return new ManagerEntity({ ...definition });
	}
}
