import { type FactoryYearBike, type MileageBike, type PurchaseDateBike, type TypeBike, type RegistrationBike } from "domains/types/bike";

export interface BikeDefinition {
	registration: RegistrationBike;
	factoryYear: FactoryYearBike;
	type: TypeBike;
	mileage: MileageBike;
	purchaseDate: PurchaseDateBike;
	model: string | null;
	status: boolean;
}

export class BikeEntity {
	private constructor(
		public readonly definition: BikeDefinition,
	) { }

	public static create(definition: Omit<BikeDefinition, "status">) {
		return new BikeEntity({
			...definition,
			status: true,
		});
	}
}
