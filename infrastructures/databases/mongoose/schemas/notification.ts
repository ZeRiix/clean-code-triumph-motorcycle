import { zodSchema } from "@zodyac/zod-mongoose";
import { idType } from "domains/types/commonType";
import { siretType } from "domains/types/companyType";
import { priorityNotificationType } from "domains/types/notificationType";
import { model } from "mongoose";
import { z } from "zod";

const baseNotification = z.object({
	id: idType.zodSchema,
	date: z.date(),
	message: z.string(),
	priority: priorityNotificationType.zodSchema,
});

const notificationSchema = z.union([
	baseNotification.extend({
		managerId: idType.zodSchema,
	}),
	baseNotification.extend({
		clientSiret: siretType.zodSchema,
	}),
]);

const notificationDocument = z.object({
	notification: notificationSchema,
});

export const NotificationModel = model(
	"Notification",
	zodSchema(notificationDocument),
);
