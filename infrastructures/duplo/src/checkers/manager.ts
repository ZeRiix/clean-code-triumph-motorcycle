import { type GetTypeInput } from "@duplojs/core";
import { managerRepository } from "databases/repositories/managerRepository";
import { type ManagerEntity } from "domains/entities/human/managerEntity";
import { type Id, type Email } from "domains/types/commonType";

export interface ManagerExistInput {
	email: Email;
	id: Id;
}

export const managerExistInput = createTypeInput<
	ManagerExistInput
>();

export const managerExistCheck = createChecker("managerExist")
	.handler(
		async({ value, inputName }: GetTypeInput<typeof managerExistInput>, output) => {
			let manager: null | ManagerEntity = null;

			if (inputName === "email") {
				manager = await managerRepository.findOneByEmail(value);
			} else if (inputName === "id") {
				manager = await managerRepository.findOneById(value);
			}

			if (manager) {
				return output("manager.exist", manager);
			} else {
				return output("manager.notfound", null);
			}
		},
	);

export const iWantFindManager = createPresetChecker(
	managerExistCheck,
	{
		result: "manager.exist",
		catch: () => new NotFoundHttpResponse("manager.notfoud"),
	},
	makeResponseContract(NotFoundHttpResponse, "manager.notfoud"),
);

export const iWantFindManagerByEmail = iWantFindManager
	.transformInput(managerExistInput.email);

export const iWantFindManagerById = iWantFindManager
	.transformInput(managerExistInput.id);
