import { HttpClient, type TransformCodegenRouteToHttpClientRoute } from "@duplojs/http-client";
import type { CodegenRoutes } from "./outputType";

type HttpClientRoute = TransformCodegenRouteToHttpClientRoute<CodegenRoutes>;

export const httpClient = new HttpClient<HttpClientRoute>({
	baseUrl: `http://${location.hostname}:1506`,
});

httpClient.setDefaultRequestParams({
	mode: "cors",
});
