import { createRouter, createWebHistory } from "vue-router";

import auth from "@/domains/auth/router";
import { routerPageName } from "./routerPageName";

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("@/layouts/BaseLayout.vue"),
			children: [...auth()],
		},
	],
});

router.beforeEach((to, from, next) => {
	const token = getLocalStorageItem<string>("token");

	if (!token && to.name !== routerPageName.LOGIN) {
		next({ name: routerPageName.LOGIN });
	}
	next();
});
