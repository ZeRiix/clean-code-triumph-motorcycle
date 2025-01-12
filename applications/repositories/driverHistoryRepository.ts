import { type DriverHistoryEntity } from "domains/entities/bikeHistory/driverHistory";
import { type BaseRepository } from ".";

export interface driverHistoryRepository extends BaseRepository<typeof DriverHistoryEntity> {}
