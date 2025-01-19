import { prisma } from "@prisma";
import { type IncidentRepository } from "applications/repositories/incidentRepository";

export const incidentRepository: IncidentRepository = {
	async save(incidentEntity) {
		const {
			issue,
			licenseNumberDriver,
			date,
			type,
			description,
		} = incidentEntity.definition;

		const prismaIncident = await prisma.incident.findFirst({
			where: {
				issue: issue.value,
			},
		});

		if (prismaIncident) {
			await prisma.incident.update({
				where: {
					issue: issue.value,
				},
				data: {
					licenseNumberDriver: licenseNumberDriver.name,
					date: date.value,
					type: type.value,
					description,
				},
			});
		} else {
			await prisma.incident.create({
				data: {
					issue: issue.value,
					licenseNumberDriver: licenseNumberDriver.name,
					date: date.value,
					type: type.value,
					description,
				},
			});
		}

		return incidentEntity;
	},
};
