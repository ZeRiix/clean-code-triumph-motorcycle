import { type BikeEntity } from "domains/entities/bikeEntity";
import { type RegistrationBike } from "domains/types/bikeType";
import { type BaseRepository } from ".";

export interface BikeRepository extends BaseRepository<typeof BikeEntity> {
	getByRegistration(registrationBick: RegistrationBike): Promise<BikeEntity>;
}
