import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "./outputType";
import { router } from "@/router";
import { routerPageName } from "@/router/routerPageName";

type HttpClientRoute = TransformCodegenRouteToHttpClientRoute<CodegenRoutes>;

export const httpClient = new HttpClient<HttpClientRoute>({
	baseUrl: `http://${location.hostname}:1506`,
});

httpClient.setDefaultRequestParams({
	mode: "cors",
});

httpClient.setInterceptor("request", (request) => {
	const token = getLocalStorageItem<string | null>("token");

	if (token) {
		if (!request.headers) {
			request.headers = {
				token,
			};
		} else {
			request.headers = {
				...request.headers,
				token,
			};
		}
	}

	return request;
});

const UNAUTHORIZED = 401;
httpClient.setInterceptor("response", async(response) => {
	if (response.code === UNAUTHORIZED) {
		removeLocalStorageItem("token");
		await router.push({ name: routerPageName.LOGIN });
	}

	return response;
});
