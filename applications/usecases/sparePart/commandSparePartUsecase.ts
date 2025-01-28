import { type SparePartCommandedRepository } from "applications/repositories/sparePartCommandedRepository";
import { type SparePartEntity } from "domains/entities/sparePart";
import { SparePartCommandedEntity, type SparePartCommandedDefinition } from "domains/entities/sparePart/sparePartCommandedEntity";

interface Dependences {
	sparePartCommandedRepository: SparePartCommandedRepository;
}

interface Params {
	sparePartComandedParams: Pick<
		SparePartCommandedDefinition,
		"quantity" | "unitPriceTTC" | "dayDeliveryDelay" | "id"
	>;
	sparePartEntity: SparePartEntity;
}

export class CommandSparePartUsecase {
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const { sparePartComandedParams, sparePartEntity } = params;

		const sparePartCommanded = SparePartCommandedEntity.create({
			...sparePartComandedParams,
			reference: sparePartEntity.definition.reference,
		});

		return dependences.sparePartCommandedRepository.save(sparePartCommanded);
	}
}
