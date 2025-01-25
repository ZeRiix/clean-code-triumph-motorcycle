import type { ZodObject, ZodTypeAny, infer as zodInfer } from "zod";
import type { Ref } from "vue";
import { routerPageName } from "@/router/routerPageName";

export function useRouteQuery<
	T extends Record<string, ZodTypeAny>,
>(objectSchemas: T): Ref<zodInfer<ZodObject<T>>> {
	const route = useRoute();
	const router = useRouter();
	const currentRouteName = route.name;

	const params = computed(() => {
		const zodSchema = zod.object(objectSchemas);

		const { success, data } = zodSchema.safeParse(route.query);

		if (currentRouteName !== route.name) {
			throw new Error("Route change.");
		}

		if (!success) {
			// eslint-disable-next-line @typescript-eslint/no-floating-promises
			router.push({ name: routerPageName.LOGIN });
			throw new Error("Query is invalid.");
		}

		return data;
	});

	return params;
}
