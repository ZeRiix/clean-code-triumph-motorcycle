import { type BaseRepository } from ".";
import { type SparePartCommandedEntity } from "domains/entities/sparePart/sparePartCommandedEntity";

export interface SparePartCommandedRepository extends BaseRepository<
	typeof SparePartCommandedEntity
> {

}
