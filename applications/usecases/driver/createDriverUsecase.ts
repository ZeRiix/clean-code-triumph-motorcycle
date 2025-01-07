import { type DriverRepository } from "applications/interfaces/repositories/driverRepository";
import { type DriverDefinition } from "domains/entities/driverEntity";

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
			fullName: params.driver.fullName,
			birthdate: params.driver.birthdate,
			licenseDateObtained: params.driver.licenseDateObtained,
			licenseNumber: params.driver.licenseNumber,
		});

		return driver;
	}
}
