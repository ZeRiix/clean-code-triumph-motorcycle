import { bikeRepository } from "databases/repositories/bikeRepository";
import { type VinBike } from "domains/types/bikeType";

export const bikeExistCheck = createChecker("bikeExist")
	.handler(
		async(vin: VinBike, output) => {
			const bike = await bikeRepository.getByVin(vin);

			if (bike) {
				return output("bike.exist", bike);
			} else {
				return output("bike.notfound", undefined);
			}
		},
	);

export const iWantBike = createPresetChecker(
	bikeExistCheck,
	{
		result: "bike.exist",
		catch: () => new NotFoundHttpResponse("bike.notfound"),
		indexing: "bike",
	},
	makeResponseContract(NotFoundHttpResponse, "bike.notfound"),
);

export const iWantVinBikeToBeAvailable = createPresetChecker(
	bikeExistCheck,
	{
		result: "bike.notfound",
		catch: () => new ConflictHttpResponse("bike.vin.notavailable"),
	},
	makeResponseContract(ConflictHttpResponse, "bike.vin.notavailable"),
);
