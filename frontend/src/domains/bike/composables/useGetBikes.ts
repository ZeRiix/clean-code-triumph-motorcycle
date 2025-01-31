
import type { HttpClientRoute } from "@/lib/httpClient";
import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type Bike = FindHttpClientRouteResponse<
	FindHttpClientRoute<HttpClientRoute, "GET", "/bikes">,
	"information",
	"bikes.get"
>["body"][number];

export function useGetBikes() {
	const bikes = ref<Bike[]>([]);

	function getBikes(page = 0, vin?: string) {
		return httpClient.get(
			"/bikes",
			{
				query: {
					page: String(page),
					vin,
				},
			},
		).whenInformation("bikes.get", ({ body }) => {
			bikes.value = body;
		});
	}

	return {
		bikes,
		getBikes,
	};
}
