import { type PositiveNumber } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from ".";
import { type TechnicianDefinition } from "./human/technicianEntity";

export interface MaintenanceInterviewDefinition {
	issue: PositiveNumber;
	reservedDate: Date;
	date: Date | null;
	note: string | null;
	cost: PositiveNumber | null;
	socialSecurityNumberTechnician: TechnicianDefinition["socialSecurityNumber"] | null;
	isFinished: boolean;
}

@interfaceDomainEntity
export class MaintenanceInterviewEntity extends DomainEntity<MaintenanceInterviewDefinition> {
	public static create(definition: Omit<MaintenanceInterviewDefinition, "reservedDate">) {
		return new MaintenanceInterviewEntity({
			...definition,
			reservedDate: new Date(),
		});
	}
}
