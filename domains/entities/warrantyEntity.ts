/*
 * Justification: Managing warranties and corrective actions in the event
 *      of failure requires a separate business entity to structure
 *      this information.
*/

export interface WarrantyDefinition {
	startDate: Date;
	endDate: Date;
	description: string | null;
}

export class WarrantyEntity {
	private constructor(
		public readonly definition: WarrantyDefinition,
	) { }

	public static create(definition: WarrantyDefinition) {
		return new WarrantyEntity(definition);
	}

	public extendWarranty(endDate: Date) {
		return new WarrantyEntity({
			...this.definition,
			endDate,
		});
	}
}
