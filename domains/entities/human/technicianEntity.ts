import { interfaceDomainEntity } from "..";
import { UserDefinition, UserEntity } from "./userEntity";

export interface TechnicianDefinition extends UserDefinition {

}

@interfaceDomainEntity
export class TechnicianEntity extends UserEntity<TechnicianDefinition> {
	public static create(definition: TechnicianDefinition) {
		return new TechnicianEntity({ ...definition });
	}
}
