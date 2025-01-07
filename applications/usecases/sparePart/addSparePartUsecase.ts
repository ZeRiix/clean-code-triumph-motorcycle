import { type SparePartRepository } from "applications/interfaces/sparePartRepository";
import { type SparePartDefinition } from "domains/entities/sparePartEntity";

interface Dependences {
	sparePartRepository: SparePartRepository;
}

interface Params {
	sparePartParams: Pick<
		SparePartDefinition,
		"reference" | "name" | "reorderLevel" | "unitPriceTTC"
	>;
}

export class AddSparePartUsecase {
	public static async execute(
		dependences: Dependences,
		params: Params,
	) {
		const sparePart = await dependences.sparePartRepository.create({
			...params.sparePartParams,
		});

		return sparePart;
	}
}
