import { type RegistrationBike } from "domains/types/bikeType";
import { DomainEntity, interfaceDomainEntity } from ".";
import { Siret } from "domains/types/companyType";

export interface TryDefinition {
	startDate: Date;
	endDate: Date;
	MotorcycleReference: RegistrationBike;
	ClientSiret: Siret;
}

@interfaceDomainEntity
export class TryEntity extends DomainEntity<TryDefinition> {
	public static create(definition: TryDefinition) {
		return new TryEntity({
			...definition,
		});
	}
}
