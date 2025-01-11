import { type VinBike, type FactoryYearBike, type PurchaseDateBike, type RegistrationBike } from "domains/types/bikeType";
import { DomainEntity, interfaceDomainEntity } from ".";
import { BikeModelDefinition } from "./bikeModelEntity";
import { type PositiveNumber } from "domains/types/commonType";

export interface BikeDefinition {
	vin: VinBike;
	BikeModelName: BikeModelDefinition["name"];
	registration: RegistrationBike;
	factoryYear: FactoryYearBike;
	mileage: PositiveNumber;
	purchaseDate: PurchaseDateBike;
	stillInCirculation: boolean;
	lastInterviewDate: Date;
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
