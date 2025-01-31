/* eslint-disable @typescript-eslint/init-declarations */
import type {
	FastifyInstance,
	FastifyPluginCallback,
	FastifyPluginOptions,
	FastifyRequest,
	FastifyReply,
} from "fastify";

export type Middleware = (request: FastifyRequest, reply: FastifyReply, next: () => void) => void;

function createWorkSpace(
	routes: (fastify: FastifyInstance) => void,
): FastifyPluginCallback;

function createWorkSpace(
	middlewares: Middleware[],
	routes: (fastify: FastifyInstance) => void,
): FastifyPluginCallback;

function createWorkSpace(
	middlewaresOrRoutes: Middleware[] | ((fastify: FastifyInstance) => void),
	routesMaybe?: (fastify: FastifyInstance) => void,
): FastifyPluginCallback {
	let middlewares: Middleware[] | undefined;
	let routes: (fastify: FastifyInstance) => void;

	if (Array.isArray(middlewaresOrRoutes)) {
		middlewares = middlewaresOrRoutes;

		routes = routesMaybe!;
	} else {
		middlewares = undefined;
		routes = middlewaresOrRoutes;
	}

	return (fastify: FastifyInstance, options: FastifyPluginOptions, done: () => void) => {
		if (middlewares) {
			middlewares.forEach((middleware) => {
				fastify.addHook("preHandler", middleware);
			});
		}
		routes(fastify);
		done();
	};
}

export default createWorkSpace;

