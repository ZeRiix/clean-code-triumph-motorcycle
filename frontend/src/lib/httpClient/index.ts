import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "./outputType";
import { router } from "@/router";
import { routerPageName } from "@/router/routerPageName";

export type HttpClientRoute = TransformCodegenRouteToHttpClientRoute<CodegenRoutes>;

export const httpClient = new HttpClient<HttpClientRoute>({
	baseUrl: `http://${location.hostname}:1506`,
});

const { token } = useToken();

httpClient.setDefaultRequestParams({
	mode: "cors",
	headers: {
		get token() {
			return token.value ?? undefined;
		},
	},
});

httpClient.hooks.add({
	type: "information",
	value: "token.invalid",
	callback: () => {
		token.value = null;
		void router.push({ name: routerPageName.LOGIN });
	},
});

httpClient.hooks.add({
	type: "information",
	value: "manager.notfoud",
	callback: () => {
		errorToast("You are not a manager");
		void router.push({ name: routerPageName.HOME });
	},
});
