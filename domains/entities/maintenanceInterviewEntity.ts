import { type PositiveNumber } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from ".";
import { type TechnicianDefinition } from "./human/technicianEntity";

export type MaintenanceInterviewDefinition = {
	issue: PositiveNumber;
	reservedDate: Date;
	estimatedDate: Date;
} & ({
	isFinished: true;
	date: Date;
	note: string;
	cost: PositiveNumber;
	socialSecurityNumberTechnician: TechnicianDefinition["socialSecurityNumber"];
} | {
	isFinished: false;
	date: null;
	note: null;
	cost: null;
	socialSecurityNumberTechnician: null;
});

@interfaceDomainEntity
export class MaintenanceInterviewEntity extends DomainEntity<MaintenanceInterviewDefinition> {
	public static create(
		definition: Omit<
			MaintenanceInterviewDefinition,
			"reservedDate" | "isFinished" | "note" | "date" | "cost" | "socialSecurityNumberTechnician"
		>,
	) {
		return new MaintenanceInterviewEntity({
			...definition,
			reservedDate: new Date(),
			isFinished: false,
			cost: null,
			date: null,
			socialSecurityNumberTechnician: null,
			note: null,
		});
	}
}
