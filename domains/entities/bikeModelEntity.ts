import { type TypeBike } from "domains/types/bikeType";
import { DomainEntity, interfaceDomainEntity } from ".";
import { type PositiveNumber } from "domains/types/commonType";

export interface BikeModelDefinition {
	name: string;
	type: TypeBike;
	interviewIntervalByKillometers: PositiveNumber;
	interviewIntervalByDay: PositiveNumber;
}

@interfaceDomainEntity
export class BikeModelEntity extends DomainEntity<BikeModelDefinition> {
	public static create(definition: BikeModelDefinition) {
		return new BikeModelEntity({
			...definition,
		});
	}
}
