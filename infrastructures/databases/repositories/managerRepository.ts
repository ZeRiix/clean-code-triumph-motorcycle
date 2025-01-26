import { prisma } from "@prisma";
import { type ManagerRepository } from "applications/repositories/managerRepository";
import { managerMapper } from "databases/mapper/manager";

export const managerRepository: ManagerRepository = {
	async getAllManager() {
		const prismaManagers = await prisma.manager.findMany();

		return prismaManagers.map((prismaManager) => managerMapper(prismaManager));
	},

	async save(managerEntity) {
		const {
			id,
			fullName,
		} = managerEntity.definition;

		const prismaManager = await prisma.manager.findFirst({
			where: {
				userId: id.value,
				fullName: fullName.value,
			},
		});

		if (prismaManager) {
			await prisma.manager.update({
				where: {
					userId: id.value,
				},
				data: {
					fullName: fullName.value,
				},
			});
		} else {
			await prisma.manager.create({
				data: {
					userId: id.value,
					fullName: fullName.value,
				},
			});
		}

		return managerEntity;
	},

	async findOneById(id) {
		const prismaManager = await prisma.manager.findFirst({
			where: {
				userId: id.value,
			},
		});

		if (!prismaManager) {
			return null;
		}

		return managerMapper(prismaManager);
	},

	async findOneByEmail(email) {
		const prismaUser = await prisma.user.findFirst({
			where: {
				email: email.value,
			},
			select: { manager: true },
		});

		if (!prismaUser?.manager) {
			return null;
		}

		return managerMapper(prismaUser.manager);
	},
};
