import { type PassedDateType } from "domains/types/common";
import { type Incident } from "domains/types/incident";

export interface IncidentDefinition {
	date: PassedDateType;
	type: Incident;
	description: string | null;
}

export class IncidentEntity {
	private constructor(
		public readonly definition: IncidentDefinition,
	) { }

	public static create(definition: IncidentDefinition) {
		return new IncidentEntity({ ...definition });
	}
}
