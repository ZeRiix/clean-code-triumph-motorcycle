import { type VinBike, type FactoryYearBike, type PurchaseDateBike, type RegistrationBike } from "domains/types/bikeType";
import { DomainEntity, interfaceDomainEntity } from ".";
import { BikeModelDefinition } from "./bikeModelEntity";
import { type PositiveNumber } from "domains/types/commonType";
import { DomainError } from "domains/errors";

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

	public updateMileage(newMileage: BikeDefinition["mileage"]) {
		if (newMileage.value < this.definition.mileage.value) {
			return new DomainError("new-mileage-less-than-mileage");
		}

		return new BikeEntity({
			...this.definition,
			mileage: newMileage,
		});
	}
}
