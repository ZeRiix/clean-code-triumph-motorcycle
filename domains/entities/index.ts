export interface StaticDomainEntity<
	GenericDefinition extends object,
> {
	create(definition: GenericDefinition): object;
}

export abstract class DomainEntity<
	GenericDefinition extends object = object,
> {
	public constructor(
		public readonly definition: GenericDefinition,
	) { }
}

export type ClassDomainEntity<
	GenericDefinition extends object = object,
> = StaticDomainEntity<GenericDefinition> & typeof DomainEntity<GenericDefinition>;

export function interfaceDomainEntity<
	GenericClass extends ClassDomainEntity,
>(theClass: GenericClass) {
	return theClass;
}
