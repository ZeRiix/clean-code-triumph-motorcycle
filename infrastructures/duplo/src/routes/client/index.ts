import { iWantClientSiretIsAvailable } from "@checkers/client";
import { prisma } from "@prisma";
import { clientRepository } from "@repositories/clientRepository";
import { clientSchema } from "@schemas/client";
import { mustBeManagerBuilder } from "@security/mustBeManager";
import { domainEntitySerialize } from "@utils/domainEntitySerialize";
import { typeToZodSchema } from "@utils/typeToZodSchema";
import { CreateClientUsecase } from "applications/usecases/client/createClientUsecase";
import { siretType } from "domains/types/companyType";

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

mustBeManagerBuilder()
	.createRoute("POST", "/clients")
	.extract({
		body: zod.object({
			siret: typeToZodSchema(siretType),
			phone: zod.string(),
			address: zod.string(),
		}),
	})
	.presetCheck(
		iWantClientSiretIsAvailable,
		(pickup) => pickup("body").siret,
	)
	.handler(
		async(pickup) => {
			const { body } = pickup(["body"]);

			const clientEntity = await CreateClientUsecase.execute(
				{
					clientRepository,
				},
				{
					client: body,
				},
			);

			return new OkHttpResponse("clients.create", domainEntitySerialize(clientEntity));
		},
		makeResponseContract(OkHttpResponse, "clients.create", clientSchema),
	);
