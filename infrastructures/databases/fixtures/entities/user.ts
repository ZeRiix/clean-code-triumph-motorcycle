import { prisma } from "../prismaClient";
import type { User } from "@prisma/client";

export function makeUser(user: Partial<User>) {
	return prisma.user.create({
		data: {
			email: user.email ?? "",
			password: user.password ?? "",
			role: user.role ?? "MANAGER",
		},
		select: {
			id: true,
		},
	});
}
