import { type Client } from "@prisma/client";
import { ClientEntity } from "domains/entities/clientEntity";
import { siretType } from "domains/types/companyType";

export function clientMapper(prismaClient: Client) {
	const {
		siret,
		phone,
		address,
		isPartner,
	} = prismaClient;

	return new ClientEntity({
		siret: siretType.createOrThrow(siret),
		phone,
		address,
		isPartner,
	});
}
