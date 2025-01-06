import { z } from "zod";
import { createValueObject, type GetValueObject } from ".";

export const incidentType = createValueObject(
	"Incident",
	z.enum(["ACCIDENT", "BREAKDOWN", "FLAT_TIRE", "OUT_OF_GAS", "OTHER"]),
);
export type Incident = GetValueObject<typeof incidentType>;
