/* eslint-disable no-console */
import makeRoutes from "@routes";
import useFastify from "fastify";

export const fastify = useFastify({
	logger: true,
});

void import("@routes")
	.then(
		async() => {
			await makeRoutes(fastify);
			await fastify.listen({
				port: 3000,
				host: "0.0.0.0",
			});

			console.log("Fastify is ready !");
			console.log(fastify.printRoutes());
		},
	);
