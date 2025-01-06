/*
 * Justification: Tests require specific management to assign a motorcycle
 *      to a driver, track dates of use, and log incidents.
*/

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

	public static create(definition: TryDefinition): TryEntity {
		return new TryEntity({
			...definition,
		});
	}

	public extendTry(endDate: Date): TryEntity {
		return new TryEntity({
			...this.definition,
			endDate,
		});
	}

	public reduceTry(endDate: Date): TryEntity {
		return new TryEntity({
			...this.definition,
			endDate,
		});
	}
}
