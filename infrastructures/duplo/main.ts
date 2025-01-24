import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo } from "@duplojs/core";
import { log } from "console";

import "@routes";

const duplo = new Duplo({
	environment: "DEV",
	port: 1506,
	host: "0.0.0.0",
});

duplo.hook("beforeSend", (request, response) => {
	response.setHeaders({
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Expose-Headers": "*",
	});
});

duplo.hook(
	"beforeRouteExecution",
	(request) => {
		if (request.method !== "OPTIONS") {
			return;
		}

		return new NoContentHttpResponse("ALLOW_CORS")
			.setHeaders({
				"Access-Control-Allow-Headers": "*",
			});
	},
);

duplo.register(...useBuilder.getAllCreatedDuplose());

await duplo.launch();

log("duplo is starting");
