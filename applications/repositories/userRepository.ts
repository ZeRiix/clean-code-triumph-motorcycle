import { type BaseRepository } from ".";
import { type UserEntity } from "domains/entities/human/userEntity";
import { type Id, type Email } from "domains/types/commonType";

export interface UserRepository extends BaseRepository<
	typeof UserEntity
> {
	findOneByEmail(email: Email): Promise<UserEntity | null>;
	findOneById(id: Id): Promise<UserEntity | null>;
}
