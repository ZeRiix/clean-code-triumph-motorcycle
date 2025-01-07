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
		return new WarrantyEntity({ ...definition });
	}
}
