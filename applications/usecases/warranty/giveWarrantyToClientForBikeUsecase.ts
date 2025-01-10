import type { WarrantyRepository } from "applications/repositories/warrantyRepository";
import { type ClientEntity } from "domains/entities/clientEntity";
import { WarrantyEntity, type WarrantyDefinition } from "domains/entities/warrantyEntity";

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
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const warranty = WarrantyEntity.create({
			...params.warrrantyParams,
			clientSiret: params.clientEntity.definition.siret,
		});

		return dependences.warrantyRepository.save(warranty);
	}
}
