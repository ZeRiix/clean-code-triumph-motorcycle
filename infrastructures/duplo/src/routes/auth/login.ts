import { inputUserExist, iWantUserExist } from "@checkers/user";
import { TokenService } from "@services/token";

useBuilder()
	.createRoute("POST", "/login")
	.extract({
		body: zod.object({
			email: zod.string(),
			password: zod.string(),
		}),
	})
	.presetCheck(
		iWantUserExist,
		(pickup) => inputUserExist.email(pickup("body").email),
	)
	.handler(
		(pickup) => {
			const { id: userId } = pickup("user");

			const token = TokenService.make({ userId });

			return new OkHttpResponse("user.logged", { token });
		},
		makeResponseContract(
			OkHttpResponse,
			"user.logged",
			zod.object({ token: zod.string() }),
		),
	);

