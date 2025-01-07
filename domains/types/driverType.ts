import { z } from "zod";
import { createValueObject, type GetValueObject } from ".";

const LICENSE_NUMBER_DRIVER_PATERNE = /\b[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|1[0-9]|2A|2a|2B|2b|2[1-9]|[3-8][0-9]|9[0-5])[0-9]{6}\b/;
export const licenseNumberDriverType = createValueObject(
	"LicenseNumberDriver",
	z.string().regex(LICENSE_NUMBER_DRIVER_PATERNE),
);
export type LicenseNumberDriver = GetValueObject<typeof licenseNumberDriverType>;