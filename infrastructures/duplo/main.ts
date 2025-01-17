/* eslint-disable no-console */
import "@duplojs/node";
import "@duplojs/node/globals";
import { Duplo } from "@duplojs/core";

import "@routes";

const duplo = new Duplo({
	environment: "DEV",
	port: 1506,
	host: "localhost",
});

duplo.register(...useBuilder.getAllCreatedDuplose());

await duplo.launch();

console.log("duplo is starting");
