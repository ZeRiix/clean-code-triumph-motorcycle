import { iWantVinBikeToBeAvailable } from "@checkers/bike";
import { inputBikeModelExistCheck, iWantBikeModel } from "@checkers/bikeModel";
import { mustBeManagerBuilder } from "@security/mustBeManager";
import { typeToZodSchema } from "@utils/typeToZodSchema";
import { CreateBike } from "applications/usecases/bike/createBikeUsecase";
import { bikeRepository } from "databases/repositories/bikeRepository";
import { factoryYearBikeType, purchaseDateBikeType, registrationBikeType, vinBikeType } from "domains/types/bikeType";
import { positiveNumberType } from "domains/types/commonType";
import { bikeSchema } from "duplo/src/schemas/bike";
import { domainEntitySerialize } from "duplo/src/utils/domainEntitySerialize";

mustBeManagerBuilder()
	.createRoute("POST", "/bikes")
	.extract({
		body: zod.object({
			vin: typeToZodSchema(vinBikeType),
			modelName: zod.string(),
			registration: typeToZodSchema(registrationBikeType),
			purchaseDate: typeToZodSchema(purchaseDateBikeType),
			mileage: typeToZodSchema(positiveNumberType),
			lastInterviewDate: zod.date(),
			factoryYear: typeToZodSchema(factoryYearBikeType),
		}),
	})
	.presetCheck(
		iWantVinBikeToBeAvailable,
		(pickup) => pickup("body").vin,
	)
	.presetCheck(
		iWantBikeModel,
		(pickup) => inputBikeModelExistCheck.modelName(
			pickup("body").modelName,
		),
	)
	.handler(
		async(pickup) => {
			const bikeModel = pickup("bikeModel");
			const { factoryYear, mileage, purchaseDate, registration, vin, lastInterviewDate } = pickup("body");
			const bikeEntity = await CreateBike.execute(
				{
					bikeRepository,
				},
				{
					bike: {
						factoryYear,
						mileage,
						purchaseDate,
						registration,
						vin,
						lastInterviewDate,
					},
					bikeModel,
				},
			);
			const bike = domainEntitySerialize(bikeEntity);

			return new CreatedHttpResponse("bike.created", bike);
		},
		makeResponseContract(CreatedHttpResponse, "bike.created", bikeSchema),
	);
