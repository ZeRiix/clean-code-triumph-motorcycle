import { type IncidentRepository } from "applications/repositories/incidentRepository";
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
			...params.incident,
			licenseNumberDriver: params.driver.definition.licenseNumber,
		});

		return incident;
	}
}
