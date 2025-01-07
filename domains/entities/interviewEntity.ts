import { type FullName } from "domains/types/commonType";
import { type CostInterview, type TypeInterview } from "domains/types/interviewType";
import { DomainEntity, interfaceDomainEntity } from ".";

export interface InterviewDefinition {
	date: Date;
	type: TypeInterview;
	costTTC: CostInterview;
	fullNameTechnician: FullName;
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
