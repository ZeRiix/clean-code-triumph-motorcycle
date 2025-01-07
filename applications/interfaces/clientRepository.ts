import { type ClientEntity } from "domains/entities/clientEntity";
import { type BaseRepository } from ".";

export interface ClientRepository extends BaseRepository<typeof ClientEntity> {

}
