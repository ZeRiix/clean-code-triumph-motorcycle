import { type BaseRepository } from ".";
import { type ClientNotificationEntity } from "domains/entities/notification/clientNotificationEntity";

export interface ClientNotificationRepository extends BaseRepository<typeof ClientNotificationEntity> {}
