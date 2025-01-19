import { type DriverHistoryEntity } from "domains/entities/bikeHistory/driverHistory";
import { type BaseRepository } from ".";

export interface DriverHistoryRepository extends BaseRepository<typeof DriverHistoryEntity> {}
