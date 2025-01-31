import { type DriverRepository } from "applications/repositories/driverRepository";
import { type ClientEntity } from "domains/entities/clientEntity";
import { type DriverDefinition, DriverEntity } from "domains/entities/human/driverEntity";

interface Dependences {
	driverRepository: DriverRepository;
}

interface Params {
	driver: Pick<
		DriverDefinition,
		"fullName" | "birthdate" | "licenseDateObtained" | "licenseNumber" | "email" | "password" | "id"
	>;
	clientEntity: ClientEntity;
}

export class CreateDriver {
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const driver = DriverEntity.create({
			...params.driver,
			clientSiret: params.clientEntity.definition.siret,
		});

		return dependences.driverRepository.save(driver);
	}
}
