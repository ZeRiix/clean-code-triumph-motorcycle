import { type DriverRepository } from "applications/repositories/driverRepository";
import { type DriverDefinition } from "domains/entities/human/driverEntity";

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
	public static async execute(
		dependence: Dependences,
		params: Params,
	) {
		const driver = await dependence.driverRepository.create({
			...params.driver,
			licenseNumber: params.driver.licenseNumber,
		});

		return driver;
	}
}
