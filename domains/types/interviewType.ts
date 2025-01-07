import { z } from "zod";
import { createValueObject, type GetValueObject } from ".";

export const costInterviewType = createValueObject(
	"CostInterview",
	z.bigint().positive(),
);
export type CostInterview = GetValueObject<typeof costInterviewType>;

export const typeInterviewType = createValueObject(
	"typeInterview",
	z.enum(["PREVENTIVE", "CURATIVE"]),
);
export type TypeInterview = GetValueObject<typeof typeInterviewType>;
