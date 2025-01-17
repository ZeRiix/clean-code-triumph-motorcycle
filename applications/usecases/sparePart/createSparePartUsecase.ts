import { type SparePartRepository } from "applications/repositories/sparePartRepository";
import { SparePartEntity, type SparePartDefinition } from "domains/entities/sparePart";

interface Dependences {
	sparePartRepository: SparePartRepository;
}

interface Params {
	sparePartParams: Pick<
		SparePartDefinition,
		"reference" | "name" | "reorderLevel" | "facturedPrice"
	>;
}

export class CreateSparePartUsecase {
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const sparePart = SparePartEntity.create({
			...params.sparePartParams,
		});

		return dependences.sparePartRepository.save(sparePart);
	}
}
