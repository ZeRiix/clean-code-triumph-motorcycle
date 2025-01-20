import { type sparePartDocument } from "@mongoose/sparePart";
import { SparePartChangedEntity } from "domains/entities/sparePart/sparePartChangedEntity";
import { idType, positiveNumberType } from "domains/types/commonType";
import { partReferenceType } from "domains/types/sparePartType";
import { type z } from "zod";

export function sparePartChangedMapper(mongooseSparePartChanged: z.infer<typeof sparePartDocument>) {
	if (mongooseSparePartChanged.sparePart.type !== "used") {
		throw new Error("Wrong sparePart, expected type is'used'.");
	}

	const {
		sparePart: {
			id,
			quantity,
			reference,
			maintenanceInterviewIssue,
			date,
		},
	} = mongooseSparePartChanged;
	return new SparePartChangedEntity({
		id: idType.createOrThrow(id),
		quantity: positiveNumberType.createOrThrow(quantity),
		reference: partReferenceType.createOrThrow(reference),
		maintenanceInterviewIssue: idType.createOrThrow(
			maintenanceInterviewIssue,
		),
		date: date,
	});
}
