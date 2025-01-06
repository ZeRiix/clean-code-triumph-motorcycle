/*
 * Justification: Preventive and curative maintenance is a key functionality.
 *      Interviews include:
 *          - One type (preventive, curative)
 *          - Predefined intervals
 *          - A detailed history (date, parts replaced, cost, recommendations)
 *          - Failure monitoring and guarantees.
*/

import { type FullName } from "domains/types/common";
import { type CostInterview, type TypeInterview } from "domains/types/interview";

export interface InterviewDefinition {
	date: Date;
	type: TypeInterview;
	costTTC: CostInterview;
	technician: FullName | null;
	notes: string | null;
}

export class InterviewEntity {
	private constructor(
		public readonly definition: InterviewDefinition,
	) { }

	public static create(definition: InterviewDefinition): InterviewEntity {
		return new InterviewEntity({
			...definition,
		});
	}
}
