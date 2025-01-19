import { prisma } from "@prisma";
import { type DriverHistoryRepository } from "applications/repositories/driverHistoryRepository";

export const driverHistoryRepository: DriverHistoryRepository = {
	async save(driverHistoryEntity) {
		const {
			licenseNumberDriver,
			bikeVin,
			startDate,
			endDate,
			try: escapeTry,
		} = driverHistoryEntity.definition;

		const prismaDriverHistory = await prisma.driverHistory.findFirst({
			where: {
				licenseNumberDriver: licenseNumberDriver.value,
				bikeVin: bikeVin.value,
			},
		});

		if (prismaDriverHistory) {
			await prisma.driverHistory.update({
				where: {
					licenseNumberDriver: licenseNumberDriver.value,
					bikeVin: bikeVin.value,
				},
				data: {
					startDate,
					endDate,
					try: escapeTry,
				},
			});
		} else {
			await prisma.driverHistory.create({
				data: {
					licenseNumberDriver: licenseNumberDriver.value,
					bikeVin: bikeVin.value,
					startDate,
					endDate,
					try: escapeTry,
				},
			});
		}

		return driverHistoryEntity;
	},
};
