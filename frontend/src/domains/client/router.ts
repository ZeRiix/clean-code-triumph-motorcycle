import type { RouteRecordRaw } from "vue-router";

export const routerPageNameClient = Object.freeze({
	CLIENT: "clients",
	ADD_WARANTY_CLIENT: "add-warranty-client",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameClient.CLIENT,
		path: "/clients",
		component: () => import("./pages/ClientPage.vue"),
	},
	{
		name: routerPageNameClient.ADD_WARANTY_CLIENT,
		path: "/clients/:siret/add-warranty",
		component: () => import("./pages/AddWarrantyClientPage.vue"),
	},
];
