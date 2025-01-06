import { type ZodBranded, type ZodType, type infer as zodInfer } from "zod";

export class ValueObjectError<
	GenericName extends string,
> extends Error {
	public constructor(
		public name: GenericName,
		message: string,
	) {
		super(message);
	}
}

export class ValueObject<
	GenericName extends string,
	GenericValue extends unknown,
> {
	private constructor(
		public name: GenericName,
		public value: GenericValue,
	) {}

	public static initialization<
		GenericName extends string,
		GenericZodType extends ZodType,
	>(
		name: GenericName,
		zodSchema: GenericZodType,
		value: unknown,
	) {
		const { success, data, error } = zodSchema.safeParse(value);

		if (success) {
			return new ValueObject<
				GenericName,
				zodInfer<GenericZodType>
			>(name, <never>data);
		} else {
			return new ValueObjectError(name, error.errors.shift()!.message);
		}
	}
}

export interface ValueObjectConstructore<
	GenericName extends string,
	GenericZodBranded extends ZodBranded<ZodType, GenericName>,
> {
	name: GenericName;
	zodSchema: GenericZodBranded;
	create(value: unknown): ValueObject<zodInfer<GenericZodBranded>, GenericName> | ValueObjectError<GenericName>;
}

export function createValueObject<
	GenericName extends string,
	GenericZodType extends ZodType,
>(
	name: GenericName,
	zodSchema: GenericZodType,
): ValueObjectConstructore<
		GenericName,
		ZodBranded<GenericZodType, GenericName>
	> {
	const brandedZodSchema = zodSchema.brand(name);

	return {
		name,
		zodSchema: brandedZodSchema,
		create(value) {
			return <never>ValueObject.initialization(name, brandedZodSchema, value);
		},
	};
}

export type GetValueObject<
	GenericValueObjectConstructore extends ValueObjectConstructore<any, any>,
> = Extract<
	ReturnType<GenericValueObjectConstructore["create"]>,
	ValueObject<any, any>
>;
