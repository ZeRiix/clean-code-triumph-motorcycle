import { prisma } from "@prisma";
import { type ClientRepository } from "applications/repositories/clientRepository";
import { clientMapper } from "databases/mapper/client";

export const clientRepository: ClientRepository = {
	async getByBikeEntityOrThrow(bikeEntity) {
		const prismaClient = await prisma.driverHistory.findFirstOrThrow({
			where: {
				bikeVin: bikeEntity.definition.vin.value,
				AND: {
					OR: [
						{
							endDate: null,
						},
						{
							endDate: {
								gte: new Date(),
							},
						},
					],
				},
			},
			select: {
				driver: {
					select: {
						client: true,
					},
				},
			},
		}).then((result) => (result.driver.client));

		return clientMapper(prismaClient);
	},

	async save(clientEntity) {
		const {
			siret,
			phone,
			address,
			isPartner,
		} = clientEntity.definition;

		const prismaClient = await prisma.client.findFirst({
			where: {
				siret: siret.value,
			},
		});

		if (prismaClient) {
			await prisma.client.update({
				where: {
					siret: siret.value,
				},
				data: {
					phone,
					address,
					isPartner,
				},
			});
		} else {
			await prisma.client.create({
				data: {
					siret: siret.value,
					phone,
					address,
					isPartner,
				},
			});
		}

		return clientEntity;
	},
};
