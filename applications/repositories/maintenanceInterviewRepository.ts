import { type BaseRepository } from ".";
import { type MaintenanceInterviewEntity } from "domains/entities/maintenanceInterviewEntity";

export interface MaintenanceInterviewRepository extends BaseRepository<typeof MaintenanceInterviewEntity> {}
