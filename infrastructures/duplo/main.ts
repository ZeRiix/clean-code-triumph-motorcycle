import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo } from "@duplojs/core";
import { log } from "console";

import "@routes";

const duplo = new Duplo({
	environment: "DEV",
	port: 1506,
	host: "localhost",
});

duplo.register(...useBuilder.getAllCreatedDuplose());

await duplo.launch();

log("duplo is starting");
