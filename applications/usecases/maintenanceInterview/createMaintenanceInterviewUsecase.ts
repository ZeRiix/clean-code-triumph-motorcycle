import { type MaintenanceInterviewRepository } from "applications/repositories/maintenanceInterviewRepository";
import { type MaintenanceInterviewDefinition } from "domains/entities/maintenanceInterviewEntity";

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
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const maintenanceInterview = await dependences.maintenanceInterviewRepository.create({
			...params.maintenanceInterview,
		});

		return maintenanceInterview;
	}
}
