import { type GetTypeInput } from "@duplojs/core";
import { type Prisma } from "@prisma/client";
import { prisma } from "databases/prisma";

interface InputUser {
	email: string;
	userId: string;
}

export const inputUserExist = createTypeInput<InputUser>();

export const userExistCheck = createChecker("userExist")
	.handler(
		async({ inputName, value }: GetTypeInput<typeof inputUserExist>, output) => {
			let where: Prisma.UserFindFirstArgs["where"] = undefined;

			if (inputName === "email") {
				where = { email: value };
			} else if (inputName === "userId") {
				where = { id: value };
			}

			const user = await prisma.user.findFirst({ where });

			if (user) {
				return output("user.exist", user);
			} else {
				return output("user.notfound", undefined);
			}
		},
	);

export const iWantUserExist = createPresetChecker(
	userExistCheck,
	{
		result: "user.exist",
		catch: () => new NotFoundHttpResponse("user.notfound"),
		indexing: "user",
	},
	makeResponseContract(NotFoundHttpResponse, "user.notfound"),
);
