import { type BaseRepository } from ".";
import { type TryEntity } from "domains/entities/tryEntity";

export interface TryRepository extends BaseRepository<typeof TryEntity> {}
