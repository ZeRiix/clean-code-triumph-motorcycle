import { type BaseRepository } from ".";
import { type MaintenanceInterviewEntity } from "domains/entities/bikeHistory/maintenanceInterviewEntity";

export interface MaintenanceInterviewRepository extends BaseRepository<typeof MaintenanceInterviewEntity> {}
