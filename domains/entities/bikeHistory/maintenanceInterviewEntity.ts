import { Id, type PositiveNumber } from "domains/types/commonType";
import { DomainEntity, interfaceDomainEntity } from "..";
import { type TechnicianDefinition } from "../human/technicianEntity";
import { IncidentDefinition } from "./incidentEntity";

export interface MaintenanceInterviewFinishFields {
	isFinished: true;
	date: Date;
	note: string;
	cost: PositiveNumber;
	technicianId: TechnicianDefinition["id"];
	interviewDuration: PositiveNumber;
}

interface MaintenanceInterviewDefaultFields {
	isFinished: false;
	date: null;
	note: null;
	cost: null;
	technicianId: null;
	interviewDuration: null;
}

export type MaintenanceInterviewDefinition = {
	issue: Id;
	reservedDate: Date;
	estimatedDate: Date;
	incidentIssue: IncidentDefinition["issue"] | null;
} & (MaintenanceInterviewFinishFields | MaintenanceInterviewDefaultFields);

@interfaceDomainEntity
export class MaintenanceInterviewEntity extends DomainEntity<MaintenanceInterviewDefinition> {
	public static readonly TECHNICIAN_HOUR_COST = 50;

	public static readonly TECHNICIAN_HOUR_PROFIT = 1.05;

	public static readonly TECHNICIAN_HOUR_TAX = 1.2;

	public static create(
		definition: Omit<
			MaintenanceInterviewDefinition,
			"reservedDate" | "isFinished" | "note" | "date" | "cost" | "technicianId" | "interviewDuration"
		>,
	) {
		return new MaintenanceInterviewEntity({
			...definition,
			reservedDate: new Date(),
			isFinished: false,
			cost: null,
			date: null,
			technicianId: null,
			note: null,
			interviewDuration: null,
		});
	}

	public finish(
		definition: Omit<MaintenanceInterviewFinishFields, "isFinished">,
	) {
		return new MaintenanceInterviewEntity({
			...this.definition,
			...definition,
			isFinished: true,
		});
	}
}
