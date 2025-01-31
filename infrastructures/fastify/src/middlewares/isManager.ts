import { type FastifyReply, type FastifyRequest } from "fastify";
import { managerRepository } from "databases/repositories/managerRepository";

const UNAUTHORIZED_RESPONSE_CODE = 401;

export async function isManagerMiddleware(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	try {
		const { id: userid } = request.user!;

		const manager = await managerRepository.findOneById(userid);

		if (!manager) {
			throw new Error();
		}

		return;
	} catch {
		reply
			.headers({
				Information: "manager.notfound",
			})
			.code(UNAUTHORIZED_RESPONSE_CODE)
			.send();
	}
}
