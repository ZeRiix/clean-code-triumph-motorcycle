import { type ClientRepository } from "applications/interfaces/repositories/clientRepository";
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
			siret: params.client.siret,
			email: params.client.email,
			phone: params.client.phone,
			address: params.client.address,
		});

		return client;
	}
}
