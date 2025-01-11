import { type TypeBike } from "domains/types/bikeType";
import { DomainEntity, interfaceDomainEntity } from ".";
import { type PositiveNumber } from "domains/types/commonType";
import { BikeEntity } from "./bikeEntity";
import { ModelMisMatch } from "domains/errors/ModelMismatchError";

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

	public isMaintenanceDatePassed(bikeEntity: BikeEntity) {
		const { definition } = this;

		if (definition.name !== bikeEntity.definition.BikeModelName) {
			throw new ModelMisMatch();
		}

		const comparedDate = new Date(bikeEntity.definition.lastInterviewDate);

		comparedDate.setDate(comparedDate.getDate() + definition.interviewIntervalByDay.value);

		return comparedDate < new Date();
	}
}
