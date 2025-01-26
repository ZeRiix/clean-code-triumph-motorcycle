import { TokenService } from "@services/token";

export const checkToken = createChecker("checkTokenCheck")
	.handler((token: string | undefined, output) => {
		const tokenContent = TokenService.check(token);

		if (!tokenContent) {
			return output("token.invalid", undefined);
		} else {
			return output("token.valid", tokenContent);
		}
	});
