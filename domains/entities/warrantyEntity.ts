/*
 * Justification: Managing warranties and corrective actions in the event 
 *      of failure requires a separate business entity to structure 
 *      this information.
*/

export interface WarrantyDefinition {
    startDate: Date;
    endDate: Date;
    description?: string;
}

export class Warranty {
    private constructor(
        public readonly definition: WarrantyDefinition,
    ) { }

    public static create(definition: WarrantyDefinition): Warranty {
        return new Warranty(definition);
    }

    public extendWarranty(endDate: Date): Warranty {
        return new Warranty({
            ...this.definition,
            endDate,
        });
    }
}