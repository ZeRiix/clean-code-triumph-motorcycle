import { type DomainEntity } from "domains/entities";
import { ValueObject } from "domains/types";

type FlatDefinition<
	GenericDefinition extends object,
> = {
	[Prop in keyof GenericDefinition]: GenericDefinition[Prop] extends ValueObject<string, unknown>
		? GenericDefinition[Prop]["value"]
		: GenericDefinition[Prop]
};

export function domainEntitySerialize<
	GenericDomainEntity extends DomainEntity<object>,
>(domainEntity: GenericDomainEntity): FlatDefinition<GenericDomainEntity["definition"]> {
	return <never>Object.fromEntries(
		Object.entries(domainEntity.definition)
			.map(([key, propertyValue]) => <const>[
				key,
				propertyValue instanceof ValueObject
					? propertyValue.value
					: propertyValue,
			])
		,
	);
}
