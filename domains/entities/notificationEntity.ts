/*
 * Justification: Automatic reminders and alerts (interviews to schedule, 
 *      critical stock thresholds) require a business entity to manage 
 *      their generation and sending.
*/

import { PriorityType, PriorityEnum } from "domains/types/notification/priorityType";
import { StatusType, StatusEnum } from "domains/types/notification/statusType";

export interface NotificationDefinition {
    date: Date; // date of the notification
    message: string; // message to send
    priority: PriorityType; // priority of the notification
    status: StatusType; // status of the notification
}

export class NotificationEntity {
    private constructor(
        public readonly definition: NotificationDefinition,
    ) { }

    public static create(definition: NotificationDefinition): NotificationEntity {
        return new NotificationEntity({
            ...definition,
            priority: definition.priority || PriorityType.from(PriorityEnum.NORMAL),
            status : definition.status || StatusType.from(StatusEnum.PENDING),
        });
    }

    // template method
    private updateStatus(status: StatusType): NotificationEntity {
        return new NotificationEntity({
            ...this.definition,
            status,
        });
    }

    public readNotification(): NotificationEntity {
        return this.updateStatus(StatusType.from(StatusEnum.READ));
    }

    public ressetStatus(): NotificationEntity {
        return this.updateStatus(StatusType.from(StatusEnum.PENDING));
    }

    public deleteNotification(): NotificationEntity {
        return this.updateStatus(StatusType.from(StatusEnum.DELETED));
    }
}