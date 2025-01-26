import { type GetTypeInput } from "@duplojs/core";
import { userRepository } from "databases/repositories/userRepository";
import { type UserEntity } from "domains/entities/human/userEntity";
import { type Email, type Id } from "domains/types/commonType";

interface InputUser {
	email: Email;
	userId: Id;
}

export const inputUserExist = createTypeInput<InputUser>();

export const userExistCheck = createChecker("userExist")
	.handler(
		async({ inputName, value }: GetTypeInput<typeof inputUserExist>, output) => {
			let user: UserEntity | null = null;

			if (inputName === "email") {
				user = await userRepository.findOneByEmail(value);
			} else if (inputName === "userId") {
				user = await userRepository.findOneById(value);
			}

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
	},
	makeResponseContract(NotFoundHttpResponse, "user.notfound"),
);

export const iWantUserExistByEmail = iWantUserExist
	.transformInput(inputUserExist.email);

export const iWantUserExistByEmailToLogin = iWantUserExistByEmail
	.redefineCatch(
		() => new UnauthorizedHttpResponse("user.wrongIdentifier"),
		makeResponseContract(UnauthorizedHttpResponse, "user.wrongIdentifier"),
	);
