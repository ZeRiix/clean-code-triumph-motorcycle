import { type IncidentRepository } from "applications/interfaces/repositories/incidentRepository";
import { type DriverEntity } from "domains/entities/driverEntity";
import { type IncidentDefinition } from "domains/entities/incidentEntity";

interface Dependences {
	incidentRepository: IncidentRepository;
}

interface Params {
	incident: Pick<
		IncidentDefinition,
		"date" | "description" | "type"
	>;
	driver: DriverEntity;
}

export class CreateIncident {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const incident = await dependences.incidentRepository.create({
			date: params.incident.date,
			description: params.incident.description,
			type: params.incident.type,
			licenseNumberDriver: params.driver.definition.licenseNumber,
		});

		return incident;
	}
}
