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
	technicianId: TechnicianDefinition["id"];
} | {
	isFinished: false;
	date: null;
	note: null;
	cost: null;
	technicianId: null;
});

@interfaceDomainEntity
export class MaintenanceInterviewEntity extends DomainEntity<MaintenanceInterviewDefinition> {
	public static create(
		definition: Omit<
			MaintenanceInterviewDefinition,
			"reservedDate" | "isFinished" | "note" | "date" | "cost" | "technicianId"
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
		});
	}

	public addTechnicianNote(note: string) {
		this.definition.note = note;
	}

	public addCost(cost: PositiveNumber) {
		this.definition.cost = cost;
	}
}
