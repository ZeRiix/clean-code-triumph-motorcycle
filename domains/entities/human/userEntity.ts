import { Email, Id, type FullName } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from "..";
import { UserPassword } from "../../types/userType";

export interface UserDefinition {
	id: Id;
	fullName: FullName;
	email: Email;
	password: UserPassword;
}

@interfaceDomainEntity
export class UserEntity<
	GenericUserDefintion extends UserDefinition = UserDefinition,
> extends DomainEntity<GenericUserDefintion> {
	public static create(definition: UserDefinition) {
		return new UserEntity({ ...definition });
	}
}
