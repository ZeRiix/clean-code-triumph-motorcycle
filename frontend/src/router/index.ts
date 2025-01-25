import { createRouter, createWebHistory } from "vue-router";

import auth from "@/domains/auth/router";

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
