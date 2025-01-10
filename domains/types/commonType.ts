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

export const passedDateType = createValueObject(
	"PassedDate",
	z.date().refine((date) => date < new Date()),
);
export type PassedDate = GetValueObject<typeof passedDateType>;

export const positiveNumberType = createValueObject(
	"PositiveNumber",
	z.number().positive(),
);
export type PositiveNumber = GetValueObject<typeof positiveNumberType>;

export const idType = createValueObject(
	"Id",
	z.string().uuid(),
);

export type Id = GetValueObject<typeof idType>;
