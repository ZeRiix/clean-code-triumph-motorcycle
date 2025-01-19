import { type MaintenanceInterviewRepository } from "applications/repositories/maintenanceInterviewRepository";
import { type SparePartChangedRepository } from "applications/repositories/sparePartChangedRepository";
import { type SparePartRepository } from "applications/repositories/sparePartRepository";
import { type MaintenanceInterviewDefinition, MaintenanceInterviewEntity, type MaintenanceInterviewFinishFields } from "domains/entities/bikeHistory/maintenanceInterviewEntity";
import { SparePartEntity } from "domains/entities/sparePart";
import { positiveNumberType } from "domains/types/commonType";

interface Dependences {
	maintenanceInterviewRepository: MaintenanceInterviewRepository;
	sparePartChangedRepository: SparePartChangedRepository;
	sparePartRepository: SparePartRepository;
}

interface Params {
	maintenanceInterviewDuration: MaintenanceInterviewFinishFields["interviewDuration"];
	maintenanceInterviewIssue: MaintenanceInterviewDefinition["issue"];
}

const DEFAULT_COST = 0;

export class CalculateMaintenanceInterviewCostsService {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const sparePartChangedEntities = await dependences.sparePartChangedRepository.getAllByMaintenanceInterviewIssue(
			params.maintenanceInterviewIssue,
		);

		const listSparePartCosts = await Promise.all(sparePartChangedEntities.map(async(sparePartChangedEntity) => {
			const sparePart = await dependences.sparePartRepository.getBySparePartChangedOrThrow(
				sparePartChangedEntity,
			);

			return (
				sparePart.definition.facturedPrice.value
					* sparePartChangedEntity.definition.quantity.value
					* SparePartEntity.SPARE_PART_PROFIT
			);
		}));

		const sparePartCost = listSparePartCosts.reduce((acc, cost) => acc + cost, DEFAULT_COST);

		const technicianCost = params.maintenanceInterviewDuration.value
			* MaintenanceInterviewEntity.TECHNICIAN_HOUR_COST
			* MaintenanceInterviewEntity.TECHNICIAN_HOUR_PROFIT
			* MaintenanceInterviewEntity.TECHNICIAN_HOUR_TAX;

		return positiveNumberType.createOrThrow(sparePartCost + technicianCost);
	}
}
