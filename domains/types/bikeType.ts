import { z } from "zod";
import { createValueObject, type GetValueObject } from ".";

export const mileageBikeType = createValueObject(
	"MileageBike",
	z.number().positive(),
);
export type MileageBike = GetValueObject<typeof mileageBikeType>;

export const purchaseDateBikeType = createValueObject(
	"PurchaseDateBike",
	z.tuple([z.date(), z.number().positive()])
		.refine(([purchaseDate, factoryYear]) => {
			if (purchaseDate > new Date()) {
				return false;
			}

			if (purchaseDate.getFullYear() < factoryYear) {
				return false;
			}

			return true;
		})
		.transform(([purchaseDate]) => purchaseDate),
);
export type PurchaseDateBike = GetValueObject<typeof purchaseDateBikeType>;

const REGISTRATION_BIKE_PATTERN = /^[A-Z]{2}-\d{3}-[A-Z]{2}/;
export const registrationBikeType = createValueObject(
	"RegistrationBike",
	z.string().regex(REGISTRATION_BIKE_PATTERN),
);
export type RegistrationBike = GetValueObject<typeof registrationBikeType>;

export const typeBikeType = createValueObject(
	"TypesBike",
	z.enum(["roadster", "trail", "sport", "touring"]),
);
export type TypeBike = GetValueObject<typeof typeBikeType>;

const MIN_FACTORY_YEAR_BIKE = 1900;
export const factoryYearBikeType = createValueObject(
	"FactoryYearBike",
	z.number()
		.refine((factoryYear) => {
			if (factoryYear < MIN_FACTORY_YEAR_BIKE) {
				return false;
			}

			if (factoryYear > new Date().getFullYear()) {
				return false;
			}

			return true;
		}),
);
export type FactoryYearBike = GetValueObject<typeof factoryYearBikeType>;

const VIN_BIKE_PATTERN = /^[A-Z0-9]{17}/;

export const vinBikeType = createValueObject(
	"VinBike",
	z.string().regex(VIN_BIKE_PATTERN),
);

export type VinBike = GetValueObject<typeof vinBikeType>;
