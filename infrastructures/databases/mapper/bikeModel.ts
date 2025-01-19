import { type BikeModel } from "@prisma/client";
import { BikeModelEntity } from "domains/entities/bikeModelEntity";
import { typeBikeType } from "domains/types/bikeType";
import { positiveNumberType } from "domains/types/commonType";

export function bikeModelMapper(prismaBikeModel: BikeModel) {
	const {
		name,
		type,
		interviewIntervalByDay,
		interviewIntervalByKillometers,
	} = prismaBikeModel;

	return new BikeModelEntity({
		name,
		type: typeBikeType.createOrThrow(type),
		interviewIntervalByDay: positiveNumberType.createOrThrow(interviewIntervalByDay),
		interviewIntervalByKillometers: positiveNumberType.createOrThrow(interviewIntervalByKillometers),
	});
}
