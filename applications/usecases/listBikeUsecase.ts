import type { BikeRepository } from "applications/interfaces/repositories/bikeRepository";

export class ListBikeUsecase {
    public constructor(
        private readonly bikeRepository: BikeRepository,
    ) {}

    public async execute() {
        return this.bikeRepository.getAll();
    }
}