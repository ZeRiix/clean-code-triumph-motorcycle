import type { RouteRecordRaw } from "vue-router";

export const routerPageNameNavigation = Object.freeze({
	HOME: "home",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameNavigation.HOME,
		path: "/",
		component: () => import("./pages/HomePage.vue"),
	},
];

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
