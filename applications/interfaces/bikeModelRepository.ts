import { type RegistrationBike } from "domains/types/bikeType";
import { type BaseRepository } from ".";
import { type BikeModelEntity } from "domains/entities/bikeModelEntity";

export interface BikeModelRepository extends BaseRepository<typeof BikeModelEntity> {
	getByRegistration(registrationBick: RegistrationBike): Promise<BikeModelEntity>;
}
