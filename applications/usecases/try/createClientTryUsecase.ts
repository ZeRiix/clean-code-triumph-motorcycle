import { type TryRepository } from "applications/interfaces/tryRepository";
import { type BikeEntity } from "domains/entities/bikeEntity";
import { type DriverEntity } from "domains/entities/driverEntity";
import { type TryDefinition } from "domains/entities/tryEntity";

interface Dependences {
	tryRepository: TryRepository;
}

interface Params {
	tryParams: Pick<TryDefinition, "startDate" | "endDate">;
	driver: DriverEntity;
	bikeEntity: BikeEntity;
}

export class createClientTryUsecase {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const tryEntity = await dependences.tryRepository.create({
			...params.tryParams,
			driverLicenceNumber: params.driver.definition.licenseNumber,
			bikeRegistration: params.bikeEntity.definition.registration,
		});

		return tryEntity;
	}
}
