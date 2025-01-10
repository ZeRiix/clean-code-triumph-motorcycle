import { type ClassDomainEntity } from "domains/entities";

export interface BaseRepository<
	GenericClassDomainEntity extends ClassDomainEntity,
> {
	save(entity: InstanceType<GenericClassDomainEntity>): Promise<InstanceType<GenericClassDomainEntity>>;
}
