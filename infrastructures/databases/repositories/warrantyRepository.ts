import { prisma } from "@prisma";
import { type WarrantyRepository } from "applications/repositories/warrantyRepository";

export const warrantyRepository: WarrantyRepository = {
	async save(warrantyEntity) {
		const {
			clientSiret,
			startDate,
			endDate,
			description,
		} = warrantyEntity.definition;

		const prismaWarranty = await prisma.warranty.findFirst({
			where: {
				clientSiret: clientSiret.value,
			},
		});

		if (prismaWarranty) {
			await prisma.warranty.update({
				where: {
					clientSiret: clientSiret.value,
				},
				data: {
					startDate,
					endDate,
					description,
				},
			});
		} else {
			await prisma.warranty.create({
				data: {
					clientSiret: clientSiret.value,
					startDate,
					endDate,
					description,
				},
			});
		}

		return warrantyEntity;
	},
};
