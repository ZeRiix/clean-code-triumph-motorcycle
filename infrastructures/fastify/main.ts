/* eslint-disable no-console */
import useFastify from "fastify";

export const fastify = useFastify({
	logger: true,
});

void import("@routes")
	.then(
		async() => {
			await fastify.listen({ port: 3000 });

			console.log("Fastify is ready !");
		},
	);

