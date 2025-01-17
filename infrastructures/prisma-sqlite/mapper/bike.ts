import { type Bike } from "@prisma/client";
import { BikeEntity } from "domains/entities/bikeEntity";
import { factoryYearBikeType, purchaseDateBikeType, registrationBikeType, vinBikeType } from "domains/types/bikeType";
import { positiveNumberType } from "domains/types/commonType";

export function bikeMapper(prismaBike: Bike) {
	const {
		vin,
		modelName,
		registration,
		factoryYear,
		mileage,
		purchaseDate,
		lastInterviewDate,
		stillInCirculation,
	} = prismaBike;

	return new BikeEntity({
		vin: vinBikeType.createOrThrow(vin),
		modelName,
		registration: registrationBikeType.createOrThrow(registration),
		factoryYear: factoryYearBikeType.createOrThrow(factoryYear),
		mileage: positiveNumberType.createOrThrow(mileage),
		purchaseDate: purchaseDateBikeType.createOrThrow(purchaseDate),
		lastInterviewDate,
		stillInCirculation,
	});
}
