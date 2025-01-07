import { type SparePartEntity } from "domains/entities/sparePartEntity";
import { type BaseRepository } from ".";

export interface SparePartRepository extends BaseRepository<typeof SparePartEntity> {}
