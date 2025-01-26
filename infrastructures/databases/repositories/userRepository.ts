import { prisma } from "@prisma";
import { type UserRepository } from "applications/repositories/userRepository";
import { userMapper } from "databases/mapper/userMapper";

export const userRepository: UserRepository = {
	async save(userEntity) {
		const {
			id,
			fullName,
			email,
			password,
		} = userEntity.definition;

		const prismaUser = await prisma.user.findFirst({
			where: {
				id: id.value,
			},
		});

		if (prismaUser) {
			await prisma.user.update({
				where: {
					id: id.value,
				},
				data: {
					fullName: fullName.value,
				},
			});
		} else {
			await prisma.user.create({
				data: {
					id: id.value,
					fullName: fullName.value,
					email: email.value,
					password: password.value,
				},
			});
		}

		return userEntity;
	},

	async findOneByEmail(email) {
		const prismaUser = await prisma.user.findFirst({
			where: {
				email: email.value,
			},
		});

		if (!prismaUser) {
			return null;
		}

		return userMapper(prismaUser);
	},

	async findOneById(id) {
		const prismaUser = await prisma.user.findFirst({
			where: {
				id: id.value,
			},
		});

		if (!prismaUser) {
			return null;
		}

		return userMapper(prismaUser);
	},
};
