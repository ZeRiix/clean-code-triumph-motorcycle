import { SparePartModel, type sparePartSchema } from "@mongoose/sparePart";
import { type SparePartCommandedRepository } from "applications/repositories/sparePartCommandedRepository";
import { type z } from "zod";

export const sparePartCommandedRepository: SparePartCommandedRepository = {
	async save(sparePartCommandedEntity) {
		const {
			id,
			date,
			reference,
			unitPriceTTC,
			quantity,
			dayDeliveryDelay,
		} = sparePartCommandedEntity.definition;

		await SparePartModel.updateOne(
			{
				"sparePart.id": id.value,
			},
			{
				sparePart: {
					id: id.value,
					date,
					reference: reference.value,
					unitPriceTTC: unitPriceTTC.value,
					quantity: quantity.value,
					type: "commanded",
					dayDeliveryDelay: dayDeliveryDelay.value,
				} satisfies z.infer<typeof sparePartSchema>,
			},
			{ upsert: true },
		);

		return sparePartCommandedEntity;
	},
};
