import { type RegistrationBike } from "domains/types/bike";
import { DomainEntity, interfaceDomainEntity } from ".";

export interface TryDefinition {
	startDate: Date;
	endDate: Date;
	MotorcycleReference: RegistrationBike;
}

@interfaceDomainEntity
export class TryEntity extends DomainEntity<TryDefinition> {
	public static create(definition: TryDefinition) {
		return new TryEntity({
			...definition,
		});
	}
}
