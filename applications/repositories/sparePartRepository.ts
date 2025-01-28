import { type SparePartEntity } from "domains/entities/sparePart";
import { type BaseRepository } from ".";
import { type SparePartChangedEntity } from "domains/entities/sparePart/sparePartChangedEntity";
import { type PartReference } from "domains/types/sparePartType";

export interface SparePartRepository extends BaseRepository<
	typeof SparePartEntity
> {
	getBySparePartChangedOrThrow(sparePartChangedEntity: SparePartChangedEntity): Promise<SparePartEntity>;
	findOneByReference(reference: PartReference): Promise<SparePartEntity | null>;
	computeAvailableQuantity(reference: PartReference): Promise<number>;
}
