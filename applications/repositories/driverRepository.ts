import { type BaseRepository } from ".";
import { type DriverEntity } from "domains/entities/human/driverEntity";

export interface DriverRepository extends BaseRepository<typeof DriverEntity> {

}
