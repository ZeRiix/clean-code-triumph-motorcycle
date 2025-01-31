import type { ZodType } from "zod";
import type { FastifyRequest, FastifyReply } from "fastify";

export interface ExtractSchemas<B = unknown, Q = unknown, P = unknown> {
	body?: ZodType<B>;
	query?: ZodType<Q>;
	params?: ZodType<P>;
}

const DEFAUT_ERROR_CODE = 400;
const DEFAUT_INFO = "TYPE_ERROR";

function extract<B = unknown, Q = unknown, P = unknown>(
	schemas: ExtractSchemas<B, Q, P>,
	handler: (
		req: FastifyRequest,
		res: FastifyReply,
		extracted: {
			body: B;
			query: Q;
			params: P;
		}
	) => Promise<void>,
) {
	return async(req: FastifyRequest, res: FastifyReply) => {
		try {
			const extracted = {
				body: schemas.body ? schemas.body.parse(req.body) : undefined as B,
				query: schemas.query ? schemas.query.parse(req.query) : undefined as Q,
				params: schemas.params ? schemas.params.parse(req.params) : undefined as P,
			};

			await handler(req, res, extracted as {
				body: B;
				query: Q;
				params: P;
			});
		} catch (err) {
			res
				.headers({
					Information: DEFAUT_INFO,
				})
				.status(DEFAUT_ERROR_CODE)
				.send({ error: err });
		}
	};
}

export default extract;
