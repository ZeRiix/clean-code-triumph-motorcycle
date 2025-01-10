import { type InterviewRepository } from "applications/repositories/interviewRepository";
import { InterviewEntity, type InterviewDefinition } from "domains/entities/interviewEntity";

interface Dependences {
	interviewRepository: InterviewRepository;
}

interface Params {
	interview: Pick<
		InterviewDefinition,
		"costTTC" | "date" | "notes" | "type" | "technicianId"
	>;
}

export class CreateIncident {
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const interview = InterviewEntity.create({
			...params.interview,
		});

		return dependences.interviewRepository.save(interview);
	}
}
