import { type SparePartEntity } from "domains/entities/sparePart";
import { type BaseRepository } from ".";
import { type SparePartChangedEntity } from "domains/entities/sparePart/sparePartChangedEntity";
import { type SparePartCommandedEntity } from "domains/entities/sparePart/sparePartCommandedEntity";

export interface SparePartRepository extends BaseRepository<
	typeof SparePartEntity | typeof SparePartChangedEntity | typeof SparePartCommandedEntity
> {
	getBySparePartChangedOrThrow(sparePartChangedEntity: SparePartChangedEntity): Promise<SparePartEntity>;

}
