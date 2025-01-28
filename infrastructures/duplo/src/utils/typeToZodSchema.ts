import { ValueObject, type ValueObjectConstructore } from "domains/types";
import { type infer as zodInfer } from "zod";

export function typeToZodSchema<
	GenericValueObjectConstructore extends ValueObjectConstructore,
>(
	valueConstructor: GenericValueObjectConstructore,
) {
	return valueConstructor
		.zodSchema
		.transform((value) => new ValueObject<
			GenericValueObjectConstructore["name"],
			zodInfer<GenericValueObjectConstructore["zodSchema"]>
		>(
			valueConstructor.name,
			<never>value,
		));
}
