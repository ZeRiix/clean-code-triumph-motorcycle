import { type BaseRepository } from ".";
import { type NotificationEntity } from "domains/entities/notificationEntity";

export interface NotificationRepository extends BaseRepository<typeof NotificationEntity> {}
