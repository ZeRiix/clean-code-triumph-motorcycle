import type { TryRepository } from "applications/interfaces/repositories/tryRepository";
import { type BikeEntity } from "domains/entities/bikeEntity";
import { type ClientEntity } from "domains/entities/clientEntity";
import { type TryDefinition } from "domains/entities/tryEntity";

interface Dependences {
	tryRepository: TryRepository;
}

interface Params {
	tryParams: Pick<TryDefinition, "startDate" | "endDate">;
	clientEntity: ClientEntity;
	bikeEntity: BikeEntity;
}

export class createClientTryUsecase {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const tryEntity = await dependences.tryRepository.create({
			...params.tryParams,
			ClientSiret: params.clientEntity.definition.siret,
			MotorcycleReference: params.bikeEntity.definition.registration,
		});

		return tryEntity;
	}
}
