import { TokenService } from "@services/token";
import { type Id } from "domains/types/commonType";
import { type FastifyReply, type FastifyRequest } from "fastify";
import { z } from "zod";

declare module "fastify" {
	interface FastifyRequest {
		user?: {
			id: Id;
		};
	}
}

const UNAUTHORIZED_RESPONSE_CODE = 401;

export async function authMiddleware(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const token = z.string().parse(request.headers.token);
		const tokenContent = TokenService.check(token);

		if (!tokenContent) {
			throw new Error();
		}

		request.user = {
			id: tokenContent.userId,
		};

		return;
	} catch {
		return reply
			.headers({
				Information: "token.invalid",
			})
			.code(UNAUTHORIZED_RESPONSE_CODE)
			.send();
	}
}
