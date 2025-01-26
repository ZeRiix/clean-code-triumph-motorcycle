import { mustBeManagerBuilder } from "@security/mustBeManager";
import { typeToZodSchema } from "@utils/typeToZodSchema";
import { iWantBike } from "@checkers/bike";
import { UpdateBikeMielageUsecase } from "applications/usecases/bike/updateBikeMielageUsecase";
import { domainEntitySerialize } from "@utils/domainEntitySerialize";
import { bikeSchema } from "@schemas/bike";
// types
import { vinBikeType } from "domains/types/bikeType";
import { positiveNumberType } from "domains/types/commonType";
// repositories
import { bikeRepository } from "databases/repositories/bikeRepository";
import { bikeModelRepository } from "databases/repositories/bikeModelRepository";
import { clientNotificationRepository } from "databases/repositories/clientNotificationRepository";
import { clientRepository } from "databases/repositories/clientRepository";
import { managerNotificationRepository } from "databases/repositories/managerNotificationRepository";
import { managerRepository } from "databases/repositories/managerRepository";

mustBeManagerBuilder()
	.createRoute("PATCH", "/bikes/{vin}/mielage")
	.extract({
		params: {
			vin: typeToZodSchema(vinBikeType),
		},
		body: {
			mileage: typeToZodSchema(positiveNumberType),
		},
	})
	.presetCheck(
		iWantBike,
		(pickup) => pickup("vin"),
	)
	.cut(
		async({ pickup, dropper }) => {
			const { bike, mileage } = pickup(["bike", "mileage"]);
			const result = await UpdateBikeMielageUsecase.execute(
				{
					bikeRepository,
					bikeModelRepository,
					clientRepository,
					clientNotificationRepository,
					managerRepository,
					managerNotificationRepository,
				},
				{
					bikeEntity: bike,
					newMileage: mileage,
				},
			);

			if (result instanceof Error) {
				return new UnprocessableEntityHttpResponse("bike.mileageUpdateFailed", result.message);
			} else {
				return dropper({ bikeUpdate: result });
			}
		},
		["bikeUpdate"],
		makeResponseContract(UnprocessableEntityHttpResponse, "bike.mileageUpdateFailed", zod.string()),
	)
	.handler(
		(pickup) => {
			const bikeUpdate = domainEntitySerialize(pickup("bikeUpdate"));

			return new OkHttpResponse("bike.mileageUpdated", bikeUpdate);
		},
		makeResponseContract(OkHttpResponse, "bike.mileageUpdated", bikeSchema),
	);
