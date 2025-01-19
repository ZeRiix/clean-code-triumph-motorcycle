import { prisma } from "@prisma";
import { type InterviewRepository } from "applications/repositories/interviewRepository";

export const interviewRepository: InterviewRepository = {
	async save(interviewEntity) {
		const {
			id,
			date,
			type,
			costTTC,
			technicianId,
			notes,
		} = interviewEntity.definition;

		const prismaInterview = await prisma.interview.findFirst({
			where: {
				id: id.value,
			},
		});

		if (prismaInterview) {
			await prisma.interview.update({
				where: {
					id: id.value,
				},
				data: {
					date,
					type: type.value,
					costTTC: costTTC.value,
					technicianId: technicianId.value,
					notes,
				},
			});
		} else {
			await prisma.interview.create({
				data: {
					id: id.value,
					date,
					type: type.value,
					costTTC: costTTC.value,
					technicianId: technicianId.value,
					notes,
				},
			});
		}

		return interviewEntity;
	},
};
