import type { RouteRecordRaw } from "vue-router";

export const routerPageNameSparePart = Object.freeze({
	SPARE_PART: "spare-part",
	COMMAND_SPARE_PART: "command-spare-part",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameSparePart.SPARE_PART,
		path: "/spare-parts",
		component: () => import("./pages/SparePartPage.vue"),
	},
	{
		name: routerPageNameSparePart.COMMAND_SPARE_PART,
		path: "/command-spare-part/:reference",
		component: () => import("./pages/CommandSparePartPage.vue"),
	},
];
