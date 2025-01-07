import { type FactoryYearBike, type MileageBike, type PurchaseDateBike, type TypeBike, type RegistrationBike } from "domains/types/bike";
import { DomainEntity, interfaceDomainEntity } from ".";

export interface BikeDefinition {
	registration: RegistrationBike;
	factoryYear: FactoryYearBike;
	type: TypeBike;
	mileage: MileageBike;
	purchaseDate: PurchaseDateBike;
	model: string | null;
	stillInCirculation: boolean;
}

@interfaceDomainEntity
export class BikeEntity extends DomainEntity<BikeDefinition> {
	public static create(definition: Omit<BikeDefinition, "stillInCirculation">) {
		return new BikeEntity({
			...definition,
			stillInCirculation: true,
		});
	}

	public removeFromCirculation() {
		return new BikeEntity({
			...this.definition,
			stillInCirculation: false,
		});
	}
}
