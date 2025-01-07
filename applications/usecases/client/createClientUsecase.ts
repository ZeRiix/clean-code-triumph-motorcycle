import { type ClientRepository } from "applications/interfaces/clientRepository";
import { type ClientDefinition } from "domains/entities/clientEntity";

interface Dependences {
	clientRepository: ClientRepository;
}

interface Params {
	client: Pick<
		ClientDefinition,
		"siret" | "email" | "phone" | "address"
	>;
}

export class CreateClient {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const client = await dependences.clientRepository.create({
			...params.client,
			address: params.client.address,
		});

		return client;
	}
}
