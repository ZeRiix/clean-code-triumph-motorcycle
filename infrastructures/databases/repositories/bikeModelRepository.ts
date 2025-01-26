import { prisma } from "@prisma";
import { type BikeModelRepository } from "applications/repositories/bikeModelRepository";
import { bikeModelMapper } from "databases/mapper/bikeModel";

export const bikeModelRepository: BikeModelRepository = {
	async getByBikeEntityOrThrow(bikeEntity) {
		const prismaBikeModel = await prisma.bikeModel.findFirstOrThrow({
			where: {
				name: bikeEntity.definition.modelName,
			},
		});

		return bikeModelMapper(prismaBikeModel);
	},

	async save(bikeModelEntity) {
		const {
			name,
			type,
			interviewIntervalByDay,
			interviewIntervalByKillometers,
		} = bikeModelEntity.definition;

		const prismaBikeModel = await prisma.bikeModel.findFirst({
			where: {
				name,
			},
		});

		if (prismaBikeModel) {
			await prisma.bikeModel.update({
				where: {
					name,
				},
				data: {
					type: type.value,
					interviewIntervalByDay: interviewIntervalByDay.value,
					interviewIntervalByKillometers: interviewIntervalByKillometers.value,
				},
			});
		} else {
			await prisma.bikeModel.create({
				data: {
					name,
					type: type.value,
					interviewIntervalByDay: interviewIntervalByDay.value,
					interviewIntervalByKillometers: interviewIntervalByKillometers.value,
				},
			});
		}

		return bikeModelEntity;
	},

	async getPage(page, quantityPerPage) {
		const prismaBikeModels = await prisma.bikeModel.findMany({
			skip: page * quantityPerPage,
			take: quantityPerPage,
		});

		return prismaBikeModels.map(bikeModelMapper);
	},
};
