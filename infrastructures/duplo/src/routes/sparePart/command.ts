import { iWantSparePartExistByReference } from "@checkers/sparePart";
import { sparePartCommandedRepository } from "@repositories/sparePartCommandedRepository";
import { sparePartCommandedSchema } from "@schemas/sparePart";
import { mustBeManagerBuilder } from "@security/mustBeManager";
import { domainEntitySerialize } from "@utils/domainEntitySerialize";
import { typeToZodSchema } from "@utils/typeToZodSchema";
import { CommandSparePartUsecase } from "applications/usecases/sparePart/commandSparePartUsecase";
import { idType, positiveNumberType } from "domains/types/commonType";
import { partReferenceType, unitPriceType } from "domains/types/sparePartType";
import { quantityStockType } from "domains/types/stockType";
import { uuidv7 } from "uuidv7";

mustBeManagerBuilder()
	.createRoute("POST", "/spare-part/{sparePartReference}/command")
	.extract({
		params: {
			sparePartReference: typeToZodSchema(partReferenceType),
		},
		body: zod.object({
			quantity: typeToZodSchema(quantityStockType),
			unitPriceTTC: typeToZodSchema(unitPriceType),
			dayDeliveryDelay: typeToZodSchema(positiveNumberType),
		}),
	})
	.presetCheck(
		iWantSparePartExistByReference
			.rewriteIndexing("sparePart"),
		(pickup) => pickup("sparePartReference"),
	)
	.handler(
		async(pickup) => {
			const { sparePart, body } = pickup(["sparePart", "body"]);

			const sparePartCommanded = await CommandSparePartUsecase.execute(
				{
					sparePartCommandedRepository,
				},
				{
					sparePartEntity: sparePart,
					sparePartComandedParams: {
						id: idType.createOrThrow(uuidv7()),
						...body,
					},
				},
			);

			return new CreatedHttpResponse(
				"sparePartCommanded.created",
				domainEntitySerialize(sparePartCommanded),
			);
		},
		makeResponseContract(CreatedHttpResponse, "sparePartCommanded.created", sparePartCommandedSchema),
	);
