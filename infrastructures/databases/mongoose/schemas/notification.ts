import { zodSchema } from "@zodyac/zod-mongoose";
import { model } from "mongoose";
import { z } from "zod";

const notificationSchema = z.object({

});

export const NotificationModel = model(
	"Notification",
	zodSchema(notificationSchema),
);
