
import type { HttpClientRoute } from "@/lib/httpClient";
import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type BikeModel = FindHttpClientRouteResponse<
	FindHttpClientRoute<HttpClientRoute, "GET", "/bike-models">,
	"information",
	"bikeModels.get"
>["body"][number];

export function useGetBikeModels() {
	const bikeModels = ref<BikeModel[]>([]);

	function getBikeModels(page = 0) {
		return httpClient.get(
			"/bike-models",
			{
				query: {
					page: String(page),
				},
			},
		).whenInformation("bikeModels.get", ({ body }) => {
			bikeModels.value = body;
		});
	}

	return {
		bikeModels,
		getBikeModels,
	};
}
