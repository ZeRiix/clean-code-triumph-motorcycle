import { type User } from "@prisma/client";
import { ManagerEntity } from "domains/entities/human/managerEntity";
import { emailType, fullNameType, idType } from "domains/types/commonType";
import { userPasswordType } from "domains/types/userType";

export function managerMapper(prismaManager: User) {
	const { id, fullName, email, password } = prismaManager;
	return new ManagerEntity({
		id: idType.createOrThrow(id),
		fullName: fullNameType.createOrThrow(fullName),
		email: emailType.createOrThrow(email),
		password: userPasswordType.createOrThrow(password),
	});
}
