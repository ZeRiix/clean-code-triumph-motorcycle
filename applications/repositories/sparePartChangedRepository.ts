import { type BaseRepository } from ".";
import { type SparePartChangedEntity } from "domains/entities/sparePart/sparePartChangedEntity";
import { type MaintenanceInterviewDefinition } from "domains/entities/bikeHistory/maintenanceInterviewEntity";

export interface SparePartChangedRepository extends BaseRepository<typeof SparePartChangedEntity> {
	getAllByMaintenanceInterviewIssue(
		maintenanceInterviewIssue: MaintenanceInterviewDefinition["issue"],
	): Promise<SparePartChangedEntity[]>;
}
