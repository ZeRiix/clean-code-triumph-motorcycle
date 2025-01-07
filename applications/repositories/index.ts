import { type ClassDomainEntity } from "domains/entities";

type GetPersistentAction<
	GenericDomainEntity extends InstanceType<ClassDomainEntity>,
> = {
	[Props in keyof GenericDomainEntity]:
	GenericDomainEntity[Props] extends ((...args: any[]) => GenericDomainEntity)
		? Props
		: never
}[keyof GenericDomainEntity];

export interface BaseRepository<
	GenericClassDomainEntity extends ClassDomainEntity,
> {
	create(...args: Parameters<GenericClassDomainEntity["create"]>): Promise<InstanceType<GenericClassDomainEntity>>;
	persistentAction<
		GenericPersistentAction extends GetPersistentAction<InstanceType<GenericClassDomainEntity>>,
	>(
		entity: InstanceType<GenericClassDomainEntity>,
		method: GenericPersistentAction,
		...args: InstanceType<GenericClassDomainEntity>[GenericPersistentAction] extends ((...args: any[]) => any)
			? Parameters<InstanceType<GenericClassDomainEntity>[GenericPersistentAction]>
			: never
	): Promise<InstanceType<GenericClassDomainEntity>>;
}
