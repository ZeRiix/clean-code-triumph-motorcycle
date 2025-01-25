import type { ZodObject, ZodTypeAny, infer as zodInfer } from "zod";
import type { Ref } from "vue";
import { routerPageName } from "@/router/routerPageName";

export function useRouteParams<
	T extends Record<string, ZodTypeAny>,
>(objectSchemas: T): Ref<zodInfer<ZodObject<T>>> {
	const route = useRoute();
	const router = useRouter();
	const currentRouteName = route.name;

	const params = computed(() => {
		const zodSchema = zod.object(objectSchemas);

		if (currentRouteName !== route.name) {
			throw new Error("Route change.");
		}

		const result = zodSchema.safeParse(route.params);

		if (!result.success) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			router.push({ name: routerPageName.LOGIN });

			throw new Error("Params is invalid.");
		}

		return result.data;
	});

	return params;
}
