import { bikeModelSchema } from "@schemas/bikeModel";
import { mustBeManagerBuilder } from "@security/mustBeManager";
import { domainEntitySerialize } from "@utils/domainEntitySerialize";
import { bikeModelRepository } from "databases/repositories/bikeModelRepository";

const bikeModelQuantityPerPage = 10;

mustBeManagerBuilder()
	.createRoute("GET", "/bike-models")
	.extract({
		query: {
			page: zod.coerce.number(),
		},
	})
	.handler(
		async(pickup) => {
			const { page } = pickup(["page"]);

			const bikeModels = await bikeModelRepository.getPage(page, bikeModelQuantityPerPage)
				.then(
					(bikeModels) => bikeModels.map(domainEntitySerialize),
				);

			return new OkHttpResponse("bikeModels.get", bikeModels);
		},
		makeResponseContract(OkHttpResponse, "bikeModels.get", bikeModelSchema.array()),
	);
