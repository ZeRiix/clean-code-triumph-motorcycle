/*
 * Justification: An incident history is crucial to ensure proper
 *      management of tests and drivers.
*/

import { type PassedDateType } from "domains/types/common";
import { type Incident } from "domains/types/incident";

export interface IncidentDefinition {
	date: PassedDateType;
	type: Incident;
	description?: string;
}

export class IncidentEntity {
	private constructor(
		public readonly definition: IncidentDefinition,
	) { }

	public static create(definition: IncidentDefinition): IncidentEntity {
		return new IncidentEntity(definition);
	}
}
