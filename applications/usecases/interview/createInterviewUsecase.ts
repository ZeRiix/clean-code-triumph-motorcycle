import { type InterviewRepository } from "applications/interfaces/repositories/interviewRepository";
import { type InterviewDefinition } from "domains/entities/interviewEntity";

interface Dependences {
	interviewRepository: InterviewRepository;
}

interface Params {
	interview: Pick<
		InterviewDefinition,
		"costTTC" | "date" | "notes" | "technician" | "type"
	>;
}

export class CreateIncident {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const interview = await dependences.interviewRepository.create({
			costTTC: params.interview.costTTC,
			date: params.interview.date,
			notes: params.interview.notes,
			technician: params.interview.technician,
			type: params.interview.type,
		});

		return interview;
	}
}
