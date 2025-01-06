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
