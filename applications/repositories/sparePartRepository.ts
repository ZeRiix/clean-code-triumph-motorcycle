import { type SparePartEntity } from "domains/entities/sparePart";
import { type BaseRepository } from ".";
import { type SparePartChangedEntity } from "domains/entities/sparePart/sparePartChangedEntity";

export interface SparePartRepository extends BaseRepository<typeof SparePartEntity> {
	getBySparePartChaged(sparePartChangedEntity: SparePartChangedEntity): SparePartEntity | null;
}
