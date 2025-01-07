import { type ClientEntity } from "domains/entities/clientEntity";
import { type BaseRepository } from ".";
import { type BikeEntity } from "domains/entities/bikeEntity";

export interface ClientRepository extends BaseRepository<typeof ClientEntity> {
	getByBikeEntityOrThrow(bikeEntity: BikeEntity): Promise<ClientEntity>;
}
