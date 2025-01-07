import { type RegistrationBike } from "domains/types/bike";

export interface TryDefinition {
	startDate: Date;
	endDate: Date;
	MotorcycleReference: RegistrationBike;
}

export class TryEntity {
	private constructor(
		public readonly definition: TryDefinition,
	) { }

	public static create(definition: TryDefinition) {
		return new TryEntity({
			...definition,
		});
	}
}
