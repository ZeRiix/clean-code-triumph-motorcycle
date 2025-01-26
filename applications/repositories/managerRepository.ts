import { type ManagerEntity } from "domains/entities/human/managerEntity";
import { type BaseRepository } from ".";
import { type Id, type Email } from "domains/types/commonType";

export interface ManagerRepository extends BaseRepository<typeof ManagerEntity> {
	getAllManager(): Promise<ManagerEntity[]>;
	findOneByEmail(email: Email): Promise<ManagerEntity | null>;
	findOneById(id: Id): Promise<ManagerEntity | null>;
}
