import { ValueObjectError, type ValueObjectConstructore } from "domains/types";

export function typeToZodSchema<
	GenericValueObjectConstructore extends ValueObjectConstructore,
>(
	valueConstructor: GenericValueObjectConstructore,
) {
	return zod
		.any()
		.transform((value, ctx) => {
			const result = valueConstructor.create(value);

			if (result instanceof ValueObjectError) {
				ctx.addIssue({
					code: zod.ZodIssueCode.custom,
					message: result.message,
				});

				return zod.NEVER;
			}

			return result as ReturnType<GenericValueObjectConstructore["createOrThrow"]>;
		});
}
