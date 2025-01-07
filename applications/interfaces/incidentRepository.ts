import { type IncidentEntity } from "domains/entities/incidentEntity";
import { type BaseRepository } from ".";

export interface IncidentRepository extends BaseRepository<typeof IncidentEntity> {

}
