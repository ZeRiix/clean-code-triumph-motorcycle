import { iWantSparePartReferenceIsAvailable } from "@checkers/sparePart";
import { sparePartRepository } from "@repositories/sparePartRepository";
import { sparePartSchema } from "@schemas/sparePart";
import { mustBeManagerBuilder } from "@security/mustBeManager";
import { domainEntitySerialize } from "@utils/domainEntitySerialize";
import { typeToZodSchema } from "@utils/typeToZodSchema";
import { CreateSparePartUsecase } from "applications/usecases/sparePart/createSparePartUsecase";
import { positiveNumberType } from "domains/types/commonType";
import { partReferenceType, reorderLevelType } from "domains/types/sparePartType";

mustBeManagerBuilder()
	.createRoute("POST", "/spare-part")
	.extract({
		body: zod.object({
			reference: typeToZodSchema(partReferenceType),
			name: zod.string(),
			reorderLevel: typeToZodSchema(reorderLevelType),
			facturedPrice: typeToZodSchema(positiveNumberType),
		}),
	})
	.presetCheck(
		iWantSparePartReferenceIsAvailable,
		(pickup) => pickup("body").reference,
	)
	.handler(
		async(pickup) => {
			const { body } = pickup(["body"]);

			const sparePart = await CreateSparePartUsecase.execute(
				{ sparePartRepository },
				{
					sparePartParams: body,
				},
			);

			return new CreatedHttpResponse("sparePart.created", domainEntitySerialize(sparePart));
		},
		makeResponseContract(CreatedHttpResponse, "sparePart.created", sparePartSchema),
	);
