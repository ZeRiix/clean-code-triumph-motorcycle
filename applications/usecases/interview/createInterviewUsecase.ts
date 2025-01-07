import { type InterviewRepository } from "applications/interfaces/interviewRepository";
import { type InterviewDefinition } from "domains/entities/interviewEntity";

interface Dependences {
	interviewRepository: InterviewRepository;
}

interface Params {
	interview: Pick<
		InterviewDefinition,
		"costTTC" | "date" | "notes" | "type" | "fullNameTechnician"
	>;
}

export class CreateIncident {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const interview = await dependences.interviewRepository.create({
			...params.interview,
		});

		return interview;
	}
}
