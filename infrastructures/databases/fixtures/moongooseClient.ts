import { envs } from "../../envs";
import mongoose from "mongoose";
import { NotificationModel } from "@mongoose/notification";

export async function mongooseClient() {
	const client = await mongoose.connect(envs.MONGO_DATABASE_URL);
	NotificationModel.base = client;

	return client;
}
