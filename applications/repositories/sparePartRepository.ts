import { type SparePartEntity } from "domains/entities/sparePart";
import { type BaseRepository } from ".";
import { type SparePartChangedEntity } from "domains/entities/sparePart/sparePartChangedEntity";

export interface SparePartRepository extends BaseRepository<
	typeof SparePartEntity
> {
	getBySparePartChangedOrThrow(sparePartChangedEntity: SparePartChangedEntity): Promise<SparePartEntity>;

}
