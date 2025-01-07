import { z } from "zod";
import { createValueObject, type GetValueObject } from ".";

export const emailType = createValueObject(
	"Email",
	z.string().email(),
);
export type Email = GetValueObject<typeof emailType>;

const FULL_NAME_PATERNE = /^[a-zA-Z]+ [a-zA-Z]+$/;
export const fullNameType = createValueObject(
	"FullName",
	z.string().regex(FULL_NAME_PATERNE),
);
export type FullName = GetValueObject<typeof fullNameType>;

export const PassedDate = createValueObject(
	"PassedDate",
	z.date().refine((date) => date < new Date()),
);
export type PassedDate = GetValueObject<typeof PassedDate>;

