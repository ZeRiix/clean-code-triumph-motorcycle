import { type ZodType, type infer as zodInfer } from "zod";

export class ValueObjectError<
	GenericName extends string,
> extends Error {
	public constructor(
		public readonly name: GenericName,
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
		public readonly name: GenericName,
		public readonly value: GenericValue,
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
	GenericZodType extends ZodType,
> {
	name: GenericName;
	zodSchema: GenericZodType;
	create(value: unknown): ValueObject<GenericName, zodInfer<GenericZodType>> | ValueObjectError<GenericName>;
}

export function createValueObject<
	GenericName extends string,
	GenericZodType extends ZodType,
>(
	name: GenericName,
	zodSchema: GenericZodType,
): ValueObjectConstructore<
		GenericName,
		GenericZodType
	> {
	return {
		name,
		zodSchema,
		create(value) {
			return <never>ValueObject.initialization(name, zodSchema, value);
		},
	};
}

export type GetValueObject<
	GenericValueObjectConstructore extends ValueObjectConstructore<any, any>,
> = Extract<
	ReturnType<GenericValueObjectConstructore["create"]>,
	ValueObject<any, any>
>;

export type WrapperValueObjects = Record<string, ValueObject<any, any> | ValueObjectError<any>>;

export type CheckReturnType<
	GenericWrapperValueObjects extends WrapperValueObjects,
> = {
	success: false;
	data: undefined;
	error: Extract<
		GenericWrapperValueObjects[keyof GenericWrapperValueObjects],
		ValueObjectError<any>
	>;
} | {
	success: true;
	data: {
		[Prop in keyof GenericWrapperValueObjects]: Extract<
			GenericWrapperValueObjects[Prop],
			ValueObject<any, any>
		>
	};
	error: undefined;
};

export function checkValueObjects<
	GenericWrapperValueObjects extends WrapperValueObjects,
>(valuesObjects: GenericWrapperValueObjects): CheckReturnType<GenericWrapperValueObjects> {
	const valueObjectError = Object
		.values(valuesObjects)
		.find(
			(resultValueObject) => resultValueObject instanceof ValueObjectError,
		);

	return <never>(
		valueObjectError
			? {
				success: false,
				data: undefined,
				error: valueObjectError,
			}
			: {
				success: true,
				data: valuesObjects,
				error: undefined,
			}
	);
}
