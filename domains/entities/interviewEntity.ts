import { type FullName } from "domains/types/common";
import { type CostInterview, type TypeInterview } from "domains/types/interview";
import { DomainEntity, interfaceDomainEntity } from ".";

export interface InterviewDefinition {
	date: Date;
	type: TypeInterview;
	costTTC: CostInterview;
	technician: FullName;
	notes: string | null;
}

@interfaceDomainEntity
export class InterviewEntity extends DomainEntity<InterviewDefinition> {
	public static create(definition: InterviewDefinition) {
		return new InterviewEntity({
			...definition,
		});
	}
}
