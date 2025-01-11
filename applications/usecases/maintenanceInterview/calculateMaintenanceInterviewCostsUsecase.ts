import { type MaintenanceInterviewRepository } from "applications/repositories/maintenanceInterviewRepository";
import { type SparePartChangedRepository } from "applications/repositories/sparePartChangedRepository";
import { type SparePartRepository } from "applications/repositories/sparePartRepository";
import { type MaintenanceInterviewEntity } from "domains/entities/maintenanceInterviewEntity";
import { SparePartMismatchError } from "domains/errors/sparePartMismatchError";
import { positiveNumberType } from "domains/types/commonType";

interface Dependences {
	maintenanceInterviewRepository: MaintenanceInterviewRepository;
	sparePartChangedRepository: SparePartChangedRepository;
	sparePartRepository: SparePartRepository;
}

interface Params {
	maintenanceInterviewEntity: MaintenanceInterviewEntity;
}

const DEFAULT_COST = 0;

export class CalculateMaintenanceInterviewCostsUsecase {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const sparePartChangedEntities = await dependences.sparePartChangedRepository.getAllByMaintenanceInterview(
			params.maintenanceInterviewEntity,
		);

		const cost = sparePartChangedEntities.reduce((acc, sparePartChangedEntity) => {
			const sparePart = dependences.sparePartRepository.getBySparePartChaged(sparePartChangedEntity);

			if (!sparePart) {
				throw new SparePartMismatchError();
			}

			return acc + (sparePart.definition.unitPriceTTC.value * sparePartChangedEntity.definition.quantity.value);
		}, DEFAULT_COST);

		params.maintenanceInterviewEntity.addCost(positiveNumberType.createOrThrow(cost));

		return dependences.maintenanceInterviewRepository.save(params.maintenanceInterviewEntity);
	}
}
