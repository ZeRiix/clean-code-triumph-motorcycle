import { type MaintenanceInterviewRepository } from "applications/repositories/maintenanceInterviewRepository";
import { type MaintenanceInterviewEntity } from "domains/entities/maintenanceInterviewEntity";

interface Dependences {
	maintenanceInterviewRepository: MaintenanceInterviewRepository;
}

interface Params {
	maintenanceInterviewInterviewEntity: MaintenanceInterviewEntity;
	comment: string;
}

export class AddTechnicianCommentToMaintenanceInterviewUsecase {
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const { maintenanceInterviewInterviewEntity, comment } = params;

		maintenanceInterviewInterviewEntity.addTechnicianNote(comment);

		return dependences.maintenanceInterviewRepository.save(maintenanceInterviewInterviewEntity);
	}
}
