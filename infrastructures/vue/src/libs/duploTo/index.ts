import {
	HttpClient,
	type TransformCodegenRouteToHttpClientRoute,
} from "@duplojs/http-client";
import { type CodegenRoutes } from "./outputType";

type HttpClientRoute = TransformCodegenRouteToHttpClientRoute<
	CodegenRoutes
>;

export const duploTo = new HttpClient<HttpClientRoute>({
	baseUrl: "http://localhost:1506",
});
