import { type MaintenanceInterviewRepository } from "applications/repositories/maintenanceInterviewRepository";
import { MaintenanceInterviewEntity, type MaintenanceInterviewDefinition } from "domains/entities/maintenanceInterviewEntity";

interface Dependences {
	maintenanceInterviewRepository: MaintenanceInterviewRepository;
}

interface Params {
	maintenanceInterview: Pick<
		MaintenanceInterviewDefinition,
		"issue" | "reservedDate" | "estimatedDate"
	>;
}

export class CreateMaintenanceInterviewUsecase {
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const maintenanceInterview = MaintenanceInterviewEntity.create({
			...params.maintenanceInterview,
		});

		return dependences.maintenanceInterviewRepository.save(maintenanceInterview);
	}
}
