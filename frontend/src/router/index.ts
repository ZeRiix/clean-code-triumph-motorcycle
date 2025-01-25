import { createRouter, createWebHistory } from "vue-router";

import auth from "@/domains/auth/router";
import { routerPageName } from "./routerPageName";
import { notFound } from "@/domains/navigation/router";

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("@/layouts/BaseLayout.vue"),
			children: [...auth()],
		},
		notFound(),
	],
});

router.beforeEach((to, from, next) => {
	const token = getLocalStorageItem<string>("token");

	if (!token && to.name !== routerPageName.LOGIN) {
		next({ name: routerPageName.LOGIN });
	}
	next();
});
