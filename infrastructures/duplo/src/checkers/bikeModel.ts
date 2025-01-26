import { type GetTypeInput } from "@duplojs/core";
import { bikeModelRepository } from "databases/repositories/bikeModelRepository";
import { type BikeEntity } from "domains/entities/bikeEntity";
import { type BikeModelEntity } from "domains/entities/bikeModelEntity";

interface InputBikeModel {
	bike: BikeEntity;
	modelName: BikeEntity["definition"]["modelName"];
}
export const inputBikeModelExistCheck = createTypeInput<InputBikeModel>();

export const bikeModelExistCheck = createChecker("bikeModelExist")
	.handler(
		async({ inputName, value }: GetTypeInput<typeof inputBikeModelExistCheck>, output) => {
			let bikeModel: BikeModelEntity | undefined = undefined;

			if (inputName === "bike") {
				bikeModel = await bikeModelRepository.getByBikeEntityOrThrow(value);
			} else if (inputName === "modelName") {
				bikeModel = await bikeModelRepository.getByModelNameOrThrow(value);
			}

			if (bikeModel) {
				return output("bikeModel.exist", bikeModel);
			} else {
				return output("bikeModel.notfound", undefined);
			}
		},
	);

export const iWantBikeModel = createPresetChecker(
	bikeModelExistCheck,
	{
		result: "bikeModel.exist",
		catch: () => new NotFoundHttpResponse("bikeModel.notfound"),
		indexing: "bikeModel",
	},
	makeResponseContract(NotFoundHttpResponse, "bikeModel.notfound"),
);
