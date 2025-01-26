import { checkToken } from "@checkers/token";

export const mustBeConnectedProcess = useBuilder()
	.createProcess("mustBeConnected")
	.extract(
		{
			headers: {
				token: zod.string().optional(),
			},
		},
	)
	.check(
		checkToken,
		{
			input: (pickup) => pickup("token"),
			result: "token.valid",
			catch: () => new ForbiddenHttpResponse("token.invalid"),
			indexing: "tokenContent",
		},
		makeResponseContract(ForbiddenHttpResponse, "token.invalid"),
	)
	.exportation(["tokenContent"]);
