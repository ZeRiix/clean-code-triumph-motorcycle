import { type MaintenanceInterviewRepository } from "applications/repositories/maintenanceInterviewRepository";
import { type SparePartChangedRepository } from "applications/repositories/sparePartChangedRepository";
import { type SparePartRepository } from "applications/repositories/sparePartRepository";
import { CalculateMaintenanceInterviewCostsService } from "applications/services/calculateMaintenanceInterviewCostsService";
import { type MaintenanceInterviewEntity, type MaintenanceInterviewFinishFields } from "domains/entities/bikeHistory/maintenanceInterviewEntity";
import { type TechnicianEntity } from "domains/entities/human/technicianEntity";

export interface Dependences {
	maintenanceInterviewRepository: MaintenanceInterviewRepository;
	sparePartChangedRepository: SparePartChangedRepository;
	sparePartRepository: SparePartRepository;
}

export interface Params {
	maintenanceInterviewEntity: MaintenanceInterviewEntity;
	technicianEntity: TechnicianEntity;
	maintenanceInterviewParams: Pick<
		MaintenanceInterviewFinishFields,
		"date" | "note" | "interviewDuration"
	>;
}

export class FinishMaintenanceInterviewUsecase {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const cost = await CalculateMaintenanceInterviewCostsService.execute(
			dependences,
			{
				maintenanceInterviewDuration: params.maintenanceInterviewParams.interviewDuration,
				maintenanceInterviewIssue: params.maintenanceInterviewEntity.definition.issue,
			},
		);

		const maintenanceInterview = params.maintenanceInterviewEntity.finish({
			...params.maintenanceInterviewParams,
			cost,
			technicianId: params.technicianEntity.definition.id,
		});

		return dependences.maintenanceInterviewRepository.save(maintenanceInterview);
	}
}
