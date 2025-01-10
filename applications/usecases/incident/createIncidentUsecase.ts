import { type IncidentRepository } from "applications/repositories/incidentRepository";
import { type DriverEntity } from "domains/entities/human/driverEntity";
import { IncidentEntity, type IncidentDefinition } from "domains/entities/incidentEntity";

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
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const incident = IncidentEntity.create({
			...params.incident,
			licenseNumberDriver: params.driver.definition.licenseNumber,
		});

		return dependences.incidentRepository.save(incident);
	}
}
