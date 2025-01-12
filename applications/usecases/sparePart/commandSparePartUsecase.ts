import { type SparePartRepository } from "applications/repositories/sparePartRepository";
import { SparePartCommandedEntity, type SparePartCommandedDefinition } from "domains/entities/sparePart/sparePartCommandedEntity";

interface Dependences {
	sparePartCommandedRepository: SparePartRepository;
}

interface Params {
	sparePartComandedParams: Pick<
		SparePartCommandedDefinition,
		"reference" | "deliveryDelay" | "quantity" | "unitPriceTTC"
	>;
}

export class CommandSparePartUsecase {
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const sparePartCommanded = SparePartCommandedEntity.create({
			...params.sparePartComandedParams,
		});

		return dependences.sparePartCommandedRepository.save(sparePartCommanded);
	}
}
