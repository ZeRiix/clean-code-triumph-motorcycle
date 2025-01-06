/*
 * Justification: An incident history is crucial to ensure proper 
 *      management of tests and drivers.
*/

import type { IncidentType } from "domains/types/incident/IncidentType";

export interface IncidentDefinition {
    date: Date;
    type: IncidentType;
    description?: string;
}

export class IncidentEntity {
    private constructor(
        public readonly definition: IncidentDefinition,
    ) { }

    public static create(definition: IncidentDefinition): IncidentEntity {
        return new IncidentEntity(definition);
    }

    public updateDescription(description: string): IncidentEntity {
        return new IncidentEntity({
            ...this.definition,
            description,
        });
    }
}