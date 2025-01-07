import { z } from "zod";
import { createValueObject, type GetValueObject } from ".";

const SIRET_LENGTH = 14;
export const siretType = createValueObject(
	"Siret",
	z.string().length(SIRET_LENGTH),
);
export type Siret = GetValueObject<typeof siretType>;
