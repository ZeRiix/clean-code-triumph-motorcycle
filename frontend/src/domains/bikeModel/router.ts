import type { RouteRecordRaw } from "vue-router";

export const routerPageNameBikeModel = Object.freeze({
	BIKE_MODEL: "bike-model",
});

export default (): RouteRecordRaw[] => [
	{
		name: routerPageNameBikeModel.BIKE_MODEL,
		path: "/bike-models",
		component: () => import("./pages/BikeModelPage.vue"),
	},
];
