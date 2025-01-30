import type { RouteRecordRaw } from "vue-router";

export const routerPageNameBike = Object.freeze({
	BIKE: "bike",
	BIKE_EDIT: "bike-edit",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameBike.BIKE,
		path: "/bikes",
		component: () => import("./pages/BikePage.vue"),
	},
	{
		name: routerPageNameBike.BIKE_EDIT,
		path: "/bikes/:id",
		component: () => import("./pages/BikePage.vue"),
	},
];
