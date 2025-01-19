import { prisma } from "@prisma";
import { type MaintenanceInterviewRepository } from "applications/repositories/maintenanceInterviewRepository";

export const maintenanceInterviewRepository: MaintenanceInterviewRepository = {
	async save(maintenanceInterviewEntity) {
		const {
			issue,
			reservedDate,
			estimatedDate,
			incidentIssue,
			isFinished,
			date,
			note,
			cost,
			technicianId,
			interviewDuration,
		} = maintenanceInterviewEntity.definition;

		const prismaMaintenanceInterview = await prisma.maintenanceInterview.findFirst({
			where: {
				issue: issue.value,
			},
		});

		if (prismaMaintenanceInterview) {
			await prisma.maintenanceInterview.update({
				where: {
					issue: issue.value,
				},
				data: {
					reservedDate,
					estimatedDate,
					incidentIssue: incidentIssue?.value,
					isFinished,
					date,
					note,
					cost: cost?.value,
					technicianId: technicianId?.value,
					interviewDuration: interviewDuration?.value,
				},
			});
		} else {
			await prisma.maintenanceInterview.create({
				data: {
					issue: issue.value,
					reservedDate,
					estimatedDate,
					incidentIssue: incidentIssue?.value,
					isFinished,
					date,
					note,
					cost: cost?.value,
					technicianId: technicianId?.value,
					interviewDuration: interviewDuration?.value,
				},
			});
		}

		return maintenanceInterviewEntity;
	},
};
