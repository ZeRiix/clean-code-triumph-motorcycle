import type { ZodObject, ZodTypeAny, infer as zodInfer } from "zod";
import type { Ref } from "vue";
import { routerPageName } from "@/router/routerPageName";

export function useRouteQuery<
	T extends Record<string, ZodTypeAny>,
>(objectSchemas: T): Ref<zodInfer<ZodObject<T>>> {
	const route = useRoute();
	const router = useRouter();
	const currentRouteName = route.name;
	const zodSchema = zod.object(objectSchemas);

	const params = computed(() => {
		if (currentRouteName !== route.name) {
			throw new Error("Route change.");
		}

		const { success, data } = zodSchema.safeParse(route.query);

		if (!success) {
			void router.push({ name: routerPageName.LOGIN });
			throw new Error("Query is invalid.");
		}

		return data;
	});

	return params;
}
