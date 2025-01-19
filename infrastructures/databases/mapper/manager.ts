import { type Manager } from "@prisma/client";
import { ManagerEntity } from "domains/entities/human/managerEntity";
import { fullNameType, idType } from "domains/types/commonType";

export function managerMapper(prismaManager: Manager) {
	const { userId, fullName } = prismaManager;
	return ManagerEntity.create({
		id: idType.createOrThrow(userId),
		fullName: fullNameType.createOrThrow(fullName),
	});
}
