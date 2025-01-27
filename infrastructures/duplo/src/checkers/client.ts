import { type GetTypeInput } from "@duplojs/core";
import { clientRepository } from "@repositories/clientRepository";
import { type ClientEntity } from "domains/entities/clientEntity";
import { type Siret } from "domains/types/companyType";

export interface ClientExistInput {
	siret: Siret;
}

export const clientExistInput = createTypeInput<ClientExistInput>();

export const clientExistCheck = createChecker("clientExist")
	.handler(
		async({ inputName, value }: GetTypeInput<typeof clientExistInput>, output) => {
			let clientEntity: ClientEntity | null = null;

			if (inputName === "siret") {
				clientEntity = await clientRepository.findBySiret(value);
			}

			if (clientEntity) {
				return output("client.exist", clientEntity);
			} else {
				return output("client.notfound", null);
			}
		},
	);

export const iWantClientExist = createPresetChecker(
	clientExistCheck,
	{
		result: "client.exist",
		catch: () => new NotFoundHttpResponse("client.notfound"),
	},
	makeResponseContract(NotFoundHttpResponse, "client.notfound"),
);

export const iWantClientExistBySiret = iWantClientExist
	.transformInput(clientExistInput.siret);
