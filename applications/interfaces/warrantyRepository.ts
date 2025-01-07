import { type BaseRepository } from ".";
import { type WarrantyEntity } from "domains/entities/warrantyEntity";

export interface WarrantyRepository extends BaseRepository<typeof WarrantyEntity> {}
