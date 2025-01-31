import { createRouter, createWebHistory } from "vue-router";
import auth from "@/domains/auth/router";
import bike from "@/domains/bike/router";
import bikeModel from "@/domains/bikeModel/router";
import sparePart from "@/domains/sparePart/router";
import client from "@/domains/client/router";
import navigation, { notFound } from "@/domains/navigation/router";
import { routerPageName } from "./routerPageName";

export const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			component: () => import("@/layouts/BaseLayout.vue"),
			children: [
				...navigation(),
				...auth(),
				...bike(),
				...bikeModel(),
				...client(),
				...sparePart(),
			],
		},
		notFound(),
	],
});

router.beforeEach((to, from, next) => {
	const { token } = useToken();

	if (to.name === routerPageName.LOGIN) {
		next();
	} else if (!token.value) {
		next({ name: routerPageName.LOGIN });
	} else {
		next();
	}
});
