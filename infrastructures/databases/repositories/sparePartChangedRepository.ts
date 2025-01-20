import { SparePartModel, type sparePartSchema } from "@mongoose/sparePart";
import { type SparePartChangedRepository } from "applications/repositories/sparePartChangedRepository";
import { sparePartChangedMapper } from "databases/mapper/sparePartChanged";
import { type z } from "zod";

export const sparePartChangedRepository: SparePartChangedRepository = {
	async getAllByMaintenanceInterviewIssue(maintenanceInterviewIssue) {
		const mongooseSparePartChangeds = await SparePartModel.find(
			{
				"sparePart.maintenanceInterviewIssue": maintenanceInterviewIssue,
			},
		);

		return mongooseSparePartChangeds.map(sparePartChangedMapper);
	},

	async save(sparePartChangedEntity) {
		const {
			id,
			reference,
			quantity,
			maintenanceInterviewIssue,
			date,
		} = sparePartChangedEntity.definition;

		await SparePartModel.updateOne(
			{
				"sparePart.id": id.value,
			},
			{
				sparePart: {
					id: id.value,
					reference: reference.value,
					quantity: quantity.value,
					type: "used",
					maintenanceInterviewIssue: maintenanceInterviewIssue.value,
					date,
				} satisfies z.infer<typeof sparePartSchema>,
			},
			{ upsert: true },
		);

		return sparePartChangedEntity;
	},
};
