import type { WatchHandle } from "vue";
import type { ZodType, infer as zodInfer } from "zod";

const reactiveLocalStorage = reactive<
	Record<string, unknown>
>({});

const watchLocalStorage: Record<string, WatchHandle> = {};

export function useLocalStorageItem<
	GenericZodSchema extends ZodType,
>(
	key: string,
	zodSchema: GenericZodSchema,
) {
	if (!watchLocalStorage[key]) {
		const data = zodSchema
			.parse(
				JSON.parse(
					localStorage.getItem(key) ?? "null",
				),
			);

		reactiveLocalStorage[key] = data;

		watchLocalStorage[key] = watch(
			() => reactiveLocalStorage[key],
			() => {
				localStorage.setItem(
					key,
					JSON.stringify(reactiveLocalStorage[key]),
				);
			},
		);
	}

	const item: Ref<zodInfer<GenericZodSchema>> = computed({
		get: () => reactiveLocalStorage[key],
		set: (value) => {
			reactiveLocalStorage[key] = value;
		},
	});

	return {
		item,
	};
}
