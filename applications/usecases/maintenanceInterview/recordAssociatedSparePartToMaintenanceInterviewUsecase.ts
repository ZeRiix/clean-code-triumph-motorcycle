import { type SparePartChangedRepository } from "applications/repositories/sparePartChangedRepository";
import { SparePartChangedEntity, type SparePartChangedDefinition } from "domains/entities/sparePart/sparePartChangedEntity";

interface Dependences {
	sparePartChangedRepository: SparePartChangedRepository;
}

interface Params {
	sparePartChanged: Pick<
		SparePartChangedDefinition,
		"quantity" | "sparePartReference" | "maintenanceInterviewIssue"
	>;
}

export class RecordAssociatedSparePartToMaintenanceInterviewUsecase {
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const sparePartChanged = SparePartChangedEntity.create({
			...params.sparePartChanged,
		});

		return dependences.sparePartChangedRepository.save(sparePartChanged);
	}
}
