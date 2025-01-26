import { typeBikeType } from "domains/types/bikeType";

export const bikeModelSchema = zod.object({
	name: zod.string(),
	type: typeBikeType.zodSchema,
	interviewIntervalByKillometers: zod.number(),
	interviewIntervalByDay: zod.number(),
});
