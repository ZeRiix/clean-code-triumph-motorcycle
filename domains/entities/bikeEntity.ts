/*
 *  Justification: The motorcycle is the central element of fleet management.
 *      Each model has characteristics (model, type, mileage, date of entry into
 *      circulation) which influence maintenance requirements, test
 *      monitoring, and breakdowns.
*/
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

	public updateMileage(newMileage: MileageBike) {
		return new BikeEntity({
			...this.definition,
			mileage: newMileage,
		});
	}

	public desactivate() {
		return new BikeEntity({
			...this.definition,
			status: false,
		});
	}
}
