import { z } from "zod";
import { createValueObject, type GetValueObject } from ".";

export const priorityNotificationType = createValueObject(
	"PriorityNotification",
	z.enum([
		"low",
		"normal",
		"high",
	]),
);

export type PriorityNotification = GetValueObject<typeof priorityNotificationType>;

export const statusNotificationType = createValueObject(
	"StatusNotification",
	z.enum([
		"pending",
		"read",
		"deleted",
	]),
);

export type StatusNotification = GetValueObject<typeof statusNotificationType>;
