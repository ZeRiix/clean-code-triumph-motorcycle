import { envs } from "@envs";
import mongooseClient from "mongoose";
import { extendZod } from "@zodyac/zod-mongoose";
import { z } from "zod";
import { NotificationModel } from "./schemas/notification";

extendZod(z);

export const mongoose = await mongooseClient.connect(envs.MONGO_DATABASE_URL);

NotificationModel.base = mongoose;
