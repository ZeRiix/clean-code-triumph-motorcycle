import type { HttpClientRoute } from "@/lib/httpClient";
import type { FindHttpClientRoute, FindHttpClientRouteResponse } from "@duplojs/http-client";

export type Client = FindHttpClientRouteResponse<
	FindHttpClientRoute<HttpClientRoute, "GET", "/clients">,
	"information",
	"clients.get"
>["body"][number];

export function useGetClients() {
	const clients = ref<Client[]>([]);

	function getClients(page = 0) {
		return httpClient.get(
			"/clients",
			{
				query: {
					page: page.toString(),
				},
			},
		).whenInformation("clients.get", ({ body }) => {
			clients.value = body;
		});
	}

	return {
		clients,
		getClients,
	};
}
