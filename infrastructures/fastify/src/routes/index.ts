import { type FastifyInstance } from "fastify";
import { clientRoutes } from "./client";

async function makeRoutes(fastify: FastifyInstance) {
	await fastify.register(clientRoutes);
}

export default makeRoutes;
