import { type ManagerNotificationRepository } from "applications/repositories/managerNotificationRepository";
import { type SparePartEntity } from "domains/entities/sparePart";
import { ManagerNotificationEntity } from "domains/entities/notification/managerNotificationEntity";
import { CreateManagerNotificationUsecase } from "../managerNotification/createManagerNotificationUsecase";

interface Dependences {
	managerNotificationRepository: ManagerNotificationRepository;
}

interface Params {
	sparePartEntity: SparePartEntity;
}

export class SendNotificationLowStockSparePartUsecase {
	public static execute(
		dependences: Dependences,
		params: Params,
	) {
		const { sparePartEntity } = params;

		if (!sparePartEntity.stockLessThanReorderLevel()) {
			return;
		}

		return CreateManagerNotificationUsecase.execute(
			dependences,
			{
				managerNotification: {
					message: `The spare part ${sparePartEntity.name} is low stock`,
					priority: 
				},
			},

		);
	}
}
