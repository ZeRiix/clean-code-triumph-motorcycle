import { bikeSchema } from "@schemas/bike";
import { mustBeManagerBuilder } from "@security/mustBeManager";
import { domainEntitySerialize } from "@utils/domainEntitySerialize";
import { bikeRepository } from "databases/repositories/bikeRepository";

const bikeQuantityPerPage = 10;

mustBeManagerBuilder()
	.createRoute("GET", "/bikes")
	.extract({
		query: {
			page: zod.coerce.number(),
		},
	})
	.handler(
		async(pickup) => {
			const { page } = pickup(["page"]);

			const bikes = await bikeRepository.getPage(page, bikeQuantityPerPage)
				.then(
					(bikes) => bikes.map(domainEntitySerialize),
				);

			return new OkHttpResponse("bikes.get", bikes);
		},
		makeResponseContract(OkHttpResponse, "bikes.get", bikeSchema.array()),
	);
