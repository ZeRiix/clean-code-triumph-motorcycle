import type { ZodType, infer as zodInfer } from "zod";

const reactiveLocalStorage = reactive<
	Record<string, unknown>
>({});

export function useLocalStorageItem<
	GenericZodSchema extends ZodType,
>(
	key: string,
	zodSchema: GenericZodSchema,
) {
	const data = zodSchema
		.catch(null)
		.parse(
			JSON.parse(
				localStorage.getItem(key) ?? "null",
			),
		);

	reactiveLocalStorage[key] = data;

	const item: Ref<zodInfer<GenericZodSchema> | null> = computed({
		get: () => reactiveLocalStorage[key],
		set: (value) => {
			reactiveLocalStorage[key] = value;
		},
	});

	watch(
		item,
		() => {
			localStorage.setItem(
				key,
				JSON.stringify(item.value),
			);
		},
	);

	return {
		item,
	};
}
