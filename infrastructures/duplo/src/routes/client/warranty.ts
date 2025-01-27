import { iWantClientExistBySiret } from "@checkers/client";
import { warrantyRepository } from "@repositories/warrantyRepository";
import { clientWarrantySchema } from "@schemas/client";
import { mustBeManagerBuilder } from "@security/mustBeManager";
import { domainEntitySerialize } from "@utils/domainEntitySerialize";
import { typeToZodSchema } from "@utils/typeToZodSchema";
import { GiveWarrantyToClientForBikeUsecase } from "applications/usecases/warranty/giveWarrantyToClientForBikeUsecase";
import { siretType } from "domains/types/companyType";

mustBeManagerBuilder()
	.createRoute("POST", "/clients/{clientSiret}/warranty")
	.extract({
		params: {
			clientSiret: typeToZodSchema(siretType),
		},
		body: zod.object({
			startDate: zod.coerce.date(),
			endDate: zod.coerce.date(),
			description: zod.string().nullable(),
		}),
	})
	.presetCheck(
		iWantClientExistBySiret
			.rewriteIndexing("clientEntity"),
		(pickup) => pickup("clientSiret"),
	)
	.handler(
		async(pickup) => {
			const { clientEntity, body } = pickup(["clientEntity", "body"]);

			const warranty = await GiveWarrantyToClientForBikeUsecase.execute(
				{
					warrantyRepository,
				},
				{
					clientEntity,
					warrrantyParams: body,
				},
			);

			return new CreatedHttpResponse("warranty.created", domainEntitySerialize(warranty));
		},
		makeResponseContract(CreatedHttpResponse, "warranty.created", clientWarrantySchema),
	);
