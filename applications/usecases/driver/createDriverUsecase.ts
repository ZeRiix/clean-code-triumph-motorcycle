import { type DriverRepository } from "applications/repositories/driverRepository";
import { type DriverDefinition, DriverEntity } from "domains/entities/human/driverEntity";

interface Dependences {
	driverRepository: DriverRepository;
}

interface Params {
	driver: Pick<
		DriverDefinition,
		"fullName" | "birthdate" | "licenseDateObtained" | "licenseNumber"
	>;
}

export class CreateDriver {
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const driver = DriverEntity.create({
			...params.driver,
		});

		return dependences.driverRepository.save(driver);
	}
}
