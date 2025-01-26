import { prisma } from "@prisma";
import { type BikeRepository } from "applications/repositories/bikeRepository";
import { bikeMapper } from "../mapper/bike";

export const bikeRepository: BikeRepository = {
	async getByVin(vin) {
		const prismaBike = await prisma.bike.findFirst({
			where: {
				vin: vin.value,
			},
		});

		if (!prismaBike) {
			return null;
		}

		return bikeMapper(prismaBike);
	},

	async save(bikeEntity) {
		const {
			vin,
			modelName,
			registration,
			factoryYear,
			mileage,
			purchaseDate,
			lastInterviewDate,
			stillInCirculation,
		} = bikeEntity.definition;

		const prismaBike = await prisma.bike.findFirst({
			where: {
				vin: vin.value,
			},
		});

		if (prismaBike) {
			await prisma.bike.update({
				where: {
					vin: vin.value,
				},
				data: {
					modelName,
					registration: registration.value,
					factoryYear: factoryYear.value,
					mileage: mileage.value,
					purchaseDate: purchaseDate.value,
					stillInCirculation,
					lastInterviewDate,
				},
			});
		} else {
			await prisma.bike.create({
				data: {
					vin: vin.value,
					modelName,
					registration: registration.value,
					factoryYear: factoryYear.value,
					mileage: mileage.value,
					purchaseDate: purchaseDate.value,
					stillInCirculation,
					lastInterviewDate,
				},
			});
		}

		return bikeEntity;
	},

	async getPage(page, quantityPerPage) {
		const prismaBikes = await prisma.bike.findMany({
			skip: page * quantityPerPage,
			take: quantityPerPage,
		});

		return prismaBikes.map(bikeMapper);
	},
};
