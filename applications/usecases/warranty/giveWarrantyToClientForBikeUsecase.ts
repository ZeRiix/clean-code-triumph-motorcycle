import type { WarrantyRepository } from "applications/interfaces/repositories/warrantyRepository";
import { type ClientEntity } from "domains/entities/clientEntity";
import { type WarrantyDefinition } from "domains/entities/warrantyEntity";

interface Dependences {
	warrantyRepository: WarrantyRepository;
}

interface Params {
	warrrantyParams: Pick<
		WarrantyDefinition,
		"startDate" | "endDate" | "description"
	>;
	clientEntity: ClientEntity;
}

export class GiveWarrantyToClientForBikeUsecase {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const warranty = await dependences.warrantyRepository.create({
			...params.warrrantyParams,
			clientSiret: params.clientEntity.definition.siret,
		});

		return warranty;
	}
}
