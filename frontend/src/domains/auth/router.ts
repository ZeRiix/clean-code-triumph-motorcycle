import type { RouteRecordRaw } from "vue-router";

export const routerPageNameAuth = Object.freeze({
	LOGIN: "login",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameAuth.LOGIN,
		path: "/login",
		component: () => import("./pages/LoginPage.vue"),
	},
];
