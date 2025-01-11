import { type ManagerEntity } from "domains/entities/human/managerEntity";
import { type BaseRepository } from ".";

export interface ManagerRepository extends BaseRepository<typeof ManagerEntity> {
	getAllManager(): Promise<ManagerEntity[]>;
}
