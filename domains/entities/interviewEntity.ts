import { type CostInterview, type TypeInterview } from "domains/types/interviewType";
import { DomainEntity, interfaceDomainEntity } from ".";
import { TechnicianDefinition } from "./human/technicianEntity";

export interface InterviewDefinition {
	date: Date;
	type: TypeInterview;
	costTTC: CostInterview;
	technicianId: TechnicianDefinition["id"];
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
