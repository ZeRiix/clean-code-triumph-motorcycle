import { type BikeEntity } from "domains/entities/bikeEntity";
import { type RegistrationBike } from "domains/types/bike";

export interface BikeRepository {
	create(bike: BikeEntity): Promise<void>;
	update(bike: BikeEntity): Promise<void>;
	delete(bike: BikeEntity): Promise<void>;

	getByRegistration(registrationBick: RegistrationBike): Promise<BikeEntity>;
}
