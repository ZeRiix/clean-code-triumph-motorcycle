/*
 * Justification: Preventive and curative maintenance is a key functionality. 
 *      Interviews include:
 *          - One type (preventive, curative)
 *          - Predefined intervals
 *          - A detailed history (date, parts replaced, cost, recommendations)
 *          - Failure monitoring and guarantees.
*/
import type { TypeInterviewType } from "domains/types/interview/typeInterviewType";
import type { TechnicianInterviewType } from "domains/types/interview/technicianInterviewType";
import type { CostInterviewType } from "domains/types/interview/interviewCostType";

export interface InterviewDefinition {
    date: Date; // date of the interview
    type: TypeInterviewType;
    costTTC: CostInterviewType; // cost of the interview
    technician?: TechnicianInterviewType; // Optionnal : technician who performed the interview
    notes?: string; // Optionnal : additionnal notes
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

    // if the client wants to update the date of the interview
    public updateDate(newDate: Date): InterviewEntity {
        return new InterviewEntity({
            ...this.definition,
            date: newDate,
        });
    }

    public assignTechnician(technician: TechnicianInterviewType): InterviewEntity {
        return new InterviewEntity({
            ...this.definition,
            technician,
        });
    }

    public addNotes(notes: string): InterviewEntity {
        return new InterviewEntity({
            ...this.definition,
            notes,
        });
    }
}
