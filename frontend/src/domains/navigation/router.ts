import type { RouteRecordRaw } from "vue-router";

export function notFound(): RouteRecordRaw {
	return {
		path: "/:notFoundPath(.*)*",
		component: () => import("@/layouts/BaseLayout.vue"),
		children: [
			{
				name: "not-found",
				path: "/:notFoundPath(.*)*",
				component: () => import("./pages/NotFoundPage.vue"),
			},
		],
	};
}
