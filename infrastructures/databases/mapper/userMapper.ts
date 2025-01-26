import { type User } from "@prisma/client";
import { UserEntity } from "domains/entities/human/userEntity";
import { fullNameType, idType } from "domains/types/commonType";

export function userMapper(prismaManager: User) {
	const { id, fullName } = prismaManager;
	return new UserEntity({
		id: idType.createOrThrow(id),
		fullName: fullNameType.createOrThrow(fullName),
	});
}
