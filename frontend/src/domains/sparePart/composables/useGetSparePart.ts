import type { HttpClientRoute } from "@/lib/httpClient";
import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type SparePart = FindHttpClientRouteResponse<
	FindHttpClientRoute<HttpClientRoute, "GET", "/spare-part">,
	"information",
	"sparePart.found"
>["body"][number];

export function useGetSparePart() {
	const spareParts = ref<SparePart[]>([]);

	function getSparePart(page = 0) {
		return httpClient.get(
			"/spare-part",
			{
				query: {
					page: page.toString(),
				},
			},
		).whenInformation("sparePart.found", ({ body }) => {
			spareParts.value = body;
		});
	}

	return {
		spareParts,
		getSparePart,
	};
}
