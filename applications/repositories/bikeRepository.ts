import { type BikeEntity } from "domains/entities/bikeEntity";
import { type VinBike } from "domains/types/bikeType";
import { type BaseRepository } from ".";

export interface BikeRepository extends BaseRepository<typeof BikeEntity> {
	getByVin(vin: VinBike): Promise<BikeEntity | null>;
	getPage(page: number, quantityPerPage: number): Promise<BikeEntity[]>;
}
