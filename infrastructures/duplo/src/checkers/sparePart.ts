import { type GetTypeInput } from "@duplojs/core";
import { sparePartRepository } from "@repositories/sparePartRepository";
import { type SparePartEntity } from "domains/entities/sparePart";
import { type PartReference } from "domains/types/sparePartType";

export interface SparePartExistInput {
	reference: PartReference;
}

export const sparePartExistInput = createTypeInput<SparePartExistInput>();

export const sparePartExistCheck = createChecker("sparePartExist")
	.handler(
		async({ value, inputName }: GetTypeInput<typeof sparePartExistInput>, output) => {
			let sparePart: SparePartEntity | null = null;

			if (inputName === "reference") {
				sparePart = await sparePartRepository.findOneByReference(value);
			}

			if (sparePart) {
				return output("sparePart.exist", sparePart);
			} else {
				return output("sparePart.notfound", null);
			}
		},
	);

export const iWantSparePartExist = createPresetChecker(
	sparePartExistCheck,
	{
		result: "sparePart.exist",
		catch: () => new NotFoundHttpResponse("sparePart.notfound"),
	},
	makeResponseContract(NotFoundHttpResponse, "sparePart.notfound"),
);

export const iWantSparePartExistByReference = iWantSparePartExist
	.transformInput(sparePartExistInput.reference);
