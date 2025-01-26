import { z } from "zod";
import { createValueObject, type GetValueObject } from ".";

export const userPasswordType = createValueObject(
	"userPassword",
	z.string().regex(/[0-9]{6,8}/),
);
export type UserPassword = GetValueObject<typeof userPasswordType>;
