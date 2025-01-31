import { prisma } from "databases/prisma";
import createWorkSpace from "@helpers/createWorkSpace";
import extract from "@helpers/extract";
import { authMiddleware } from "@middlewares/auth";
import { isManagerMiddleware } from "@middlewares/isManager";
import { z } from "zod";

const MAX_PER_PAGE = 10;
const SUCCESS_RESPONSE_CODE = 200;

export const clientRoutes = createWorkSpace([authMiddleware], (fastify) => {
	fastify.get("/clients", { preHandler: isManagerMiddleware }, extract(
		{
			query: z.object({
				page: z.coerce.number(),
			}),
		},
		async(req, res, { query }) => {
			const { page } = query;

			const clients = await prisma.client.findMany({
				skip: page * MAX_PER_PAGE,
				take: MAX_PER_PAGE,
			});

			res
				.headers({
					Information: "clients.get",
				})
				.code(SUCCESS_RESPONSE_CODE)
				.send(clients);
		},
	));
});
