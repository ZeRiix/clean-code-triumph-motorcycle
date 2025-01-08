import { type SparePartEntity } from "domains/entities/sparePart";
import { type BaseRepository } from ".";

export interface SparePartRepository extends BaseRepository<typeof SparePartEntity> {}
