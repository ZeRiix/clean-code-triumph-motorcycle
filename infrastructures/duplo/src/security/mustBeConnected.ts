import { checkToken } from "@checkers/token";
import { ValueObjectError } from "domains/types";
import { idType } from "domains/types/commonType";

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
