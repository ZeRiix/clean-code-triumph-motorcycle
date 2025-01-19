import { SparePartModel } from "@mongoose/sparePart";
import { prisma } from "@prisma";
import { type SparePartRepository } from "applications/repositories/sparePartRepository";
import { sparePartMapper } from "databases/mapper/sparePart";

const inverteNumber = -1;

export const sparePartRepository: SparePartRepository = {
	async getBySparePartChangedOrThrow(sparePartChangedEntity) {
		const { reference } = sparePartChangedEntity.definition;

		const primsaSparePart = await prisma.sparePart.findFirstOrThrow({
			where: {
				reference: reference.value,
			},
		});

		const [{ quantity } = { quantity: 0 }] = await SparePartModel.aggregate<{ quantity: number }>([
			{
				$match: {
					"sparePart.reference": reference.value,
					$or: [
						{ "sparePart.type": "inStock" },
						{ "sparePart.type": "used" },
					],
				},
			},
			{
				$project: {
					quantity: {
						$cond: {
							if: {
								$eq: ["$sparePart.type", "inStock"],
							},
							then: "$sparePart.type",
							else: { $multiply: ["$sparePart.type", inverteNumber] },
						},
					},
				},
			},
			{
				$group: {
					quantity: { $sum: "$quantity" },
				},
			},
		]);

		return sparePartMapper(primsaSparePart, quantity);
	},

	async save(sparePartEntity) {
		const prismaSparePart = await prisma.sparePart.findFirst({
			where: {
				reference: sparePartEntity.definition.reference.value,
			},
		});

		if (prismaSparePart) {
			await prisma.sparePart.update({
				where: {
					reference: sparePartEntity.definition.reference.value,
				},
				data: {
					name: sparePartEntity.definition.name,
					facturedPrice: sparePartEntity.definition.facturedPrice.value,
					reorderLevel: sparePartEntity.definition.reorderLevel.value,
				},
			});
		} else {
			await prisma.sparePart.create({
				data: {
					reference: sparePartEntity.definition.reference.value,
					name: sparePartEntity.definition.name,
					facturedPrice: sparePartEntity.definition.facturedPrice.value,
					reorderLevel: sparePartEntity.definition.reorderLevel.value,
				},
			});
		}

		return sparePartEntity;
	},
};
