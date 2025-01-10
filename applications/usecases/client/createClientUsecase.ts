import { type ClientRepository } from "applications/repositories/clientRepository";
import { type ClientDefinition, ClientEntity } from "domains/entities/clientEntity";

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
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const client = ClientEntity.create({
			...params.client,
		});

		return dependences.clientRepository.save(client);
	}
}
