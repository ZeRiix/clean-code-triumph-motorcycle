import { type FullName } from "domains/types/common";
import { type CostInterview, type TypeInterview } from "domains/types/interview";

export interface InterviewDefinition {
	date: Date;
	type: TypeInterview;
	costTTC: CostInterview;
	technician: FullName;
	notes: string | null;
}

export class InterviewEntity {
	private constructor(
		public readonly definition: InterviewDefinition,
	) { }

	public static create(definition: InterviewDefinition) {
		return new InterviewEntity({
			...definition,
		});
	}
}
