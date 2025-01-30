import { type User } from "@prisma/client";
import { UserEntity } from "domains/entities/human/userEntity";
import { emailType, fullNameType, idType } from "domains/types/commonType";
import { userPasswordType } from "domains/types/userType";

export function userMapper(prismaManager: User) {
	const { id, fullName, email, password } = prismaManager;
	return new UserEntity({
		id: idType.createOrThrow(id),
		fullName: fullNameType.createOrThrow(fullName),
		email: emailType.createOrThrow(email),
		password: userPasswordType.createOrThrow(password),
	});
}
