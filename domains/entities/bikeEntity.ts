import { type FactoryYearBike, type MileageBike, type PurchaseDateBike, type RegistrationBike } from "domains/types/bikeType";
import { DomainEntity, interfaceDomainEntity } from ".";
import { BikeModelDefinition } from "./bikeModelEntity";

export interface BikeDefinition {
	BikeModelName: BikeModelDefinition["name"];
	registration: RegistrationBike;
	factoryYear: FactoryYearBike;
	mileage: MileageBike;
	purchaseDate: PurchaseDateBike;
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
}
