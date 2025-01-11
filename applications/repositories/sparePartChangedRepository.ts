import { type BaseRepository } from ".";
import { type SparePartChangedEntity } from "domains/entities/sparePart/sparePartChangedEntity";
import { type MaintenanceInterviewEntity } from "domains/entities/maintenanceInterviewEntity";

export interface SparePartChangedRepository extends BaseRepository<typeof SparePartChangedEntity> {
	getAllByMaintenanceInterview(
		maintenanceInterviewEntity: MaintenanceInterviewEntity,
	): Promise<SparePartChangedEntity[]>;
}
