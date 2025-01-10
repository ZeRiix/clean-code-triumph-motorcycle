import { type TryRepository } from "applications/repositories/tryRepository";
import { type BikeEntity } from "domains/entities/bikeEntity";
import { type DriverEntity } from "domains/entities/human/driverEntity";
import { TryEntity, type TryDefinition } from "domains/entities/tryEntity";

interface Dependences {
	tryRepository: TryRepository;
}

interface Params {
	tryParams: Pick<TryDefinition, "startDate" | "endDate" | "id">;
	driver: DriverEntity;
	bikeEntity: BikeEntity;
}

export class createClientTryUsecase {
	public static execute(dependences: Dependences, params: Params) {
		const tryEntity = TryEntity.create({
			...params.tryParams,
			driverLicenceNumber: params.driver.definition.licenseNumber,
			bikeRegistration: params.bikeEntity.definition.registration,
		});

		return dependences.tryRepository.save(tryEntity);
	}
}
