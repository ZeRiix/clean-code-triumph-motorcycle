import { type BaseRepository } from ".";
import { type DriverEntity } from "domains/entities/driverEntity";

export interface DriverRepository extends BaseRepository<typeof DriverEntity> {

}
