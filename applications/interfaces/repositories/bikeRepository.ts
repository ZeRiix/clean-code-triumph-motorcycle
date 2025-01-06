import type { BikeDefinition } from "domains/entities/bikeEntity";

export interface BikeRepository {
    create(bike: BikeDefinition): Promise<void>;
    update(bike: BikeDefinition): Promise<void>;
    delete(bike: BikeDefinition): Promise<void>;
    get(bikeId: string): Promise<BikeDefinition>;
    getAll(): Promise<BikeDefinition[]>;
}