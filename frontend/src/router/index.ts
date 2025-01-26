import { createRouter, createWebHistory } from "vue-router";
import auth from "@/domains/auth/router";
import navigation, { notFound } from "@/domains/navigation/router";
import { routerPageName } from "./routerPageName";

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("@/layouts/BaseLayout.vue"),
			children: [
				...navigation(),
				...auth(),
			],
		},
		notFound(),
	],
});

router.beforeEach((to, from, next) => {
	const { token } = useToken();

	if (token.value !== null && to.name !== routerPageName.LOGIN) {
		next({ name: routerPageName.LOGIN });
	}
	next();
});
