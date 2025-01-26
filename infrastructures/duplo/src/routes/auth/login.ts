import { iWantUserExistByEmailToLogin } from "@checkers/user";
import { TokenService } from "@services/token";
import { typeToZodSchema } from "@utils/typeToZodSchema";
import { emailType } from "domains/types/commonType";
import { userPasswordType } from "domains/types/userType";

useBuilder()
	.createRoute("POST", "/login")
	.extract({
		body: zod.object({
			email: typeToZodSchema(emailType),
			password: typeToZodSchema(userPasswordType),
		}),
	})
	.presetCheck(
		iWantUserExistByEmailToLogin
			.rewriteIndexing("user"),
		(pickup) => pickup("body").email,
	)
	.cut(
		({ pickup, dropper }) => {
			const { user, body } = pickup(["user", "body"]);

			if (user.definition.password !== body.password) {
				return new UnauthorizedHttpResponse("user.wrongIdentifier");
			}

			return dropper(null);
		},
		[],
		makeResponseContract(UnauthorizedHttpResponse, "user.wrongIdentifier"),
	)
	.handler(
		(pickup) => {
			const user = pickup("user");

			const token = TokenService.make({
				userId: user.definition.id,
			});

			return new OkHttpResponse("user.logged", token);
		},
		makeResponseContract(OkHttpResponse, "user.logged", zod.string()),
	);

