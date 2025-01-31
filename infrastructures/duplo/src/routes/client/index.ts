import { prisma } from "@prisma";
import { clientSchema } from "@schemas/client";
import { mustBeManagerBuilder } from "@security/mustBeManager";

const bikeQuantityPerPage = 10;

mustBeManagerBuilder()
	.createRoute("GET", "/clients")
	.extract({
		query: {
			page: zod.coerce.number(),
		},
	})
	.handler(
		async(pickup) => {
			const { page } = pickup(["page"]);

			const clients = await prisma.client.findMany({
				skip: page * bikeQuantityPerPage,
				take: bikeQuantityPerPage,
			});

			return new OkHttpResponse("clients.get", clients);
		},
		makeResponseContract(OkHttpResponse, "clients.get", clientSchema.array()),
	);
