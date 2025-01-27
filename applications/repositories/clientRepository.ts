import { type ClientEntity } from "domains/entities/clientEntity";
import { type BaseRepository } from ".";
import { type BikeEntity } from "domains/entities/bikeEntity";
import { type Siret } from "domains/types/companyType";

export interface ClientRepository extends BaseRepository<typeof ClientEntity> {
	getByBikeEntityOrThrow(bikeEntity: BikeEntity): Promise<ClientEntity>;
	findBySiret(siret: Siret): Promise<ClientEntity | null>;
}
