import { type BaseRepository } from ".";
import { type ManagerNotificationEntity } from "domains/entities/notification/managerNotificationEntity";

export interface ManagerNotificationRepository extends BaseRepository<typeof ManagerNotificationEntity> {}
