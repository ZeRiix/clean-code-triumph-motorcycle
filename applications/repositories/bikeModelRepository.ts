import { type BaseRepository } from ".";
import { type BikeModelEntity } from "domains/entities/bikeModelEntity";
import { type BikeEntity } from "domains/entities/bikeEntity";

export interface BikeModelRepository extends BaseRepository<typeof BikeModelEntity> {
	getByBikeEntityOrThrow(bikeEntity: BikeEntity): Promise<BikeModelEntity>;
}
