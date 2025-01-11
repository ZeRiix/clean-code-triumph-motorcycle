export class TechnicianAssignementError extends Error {
	public constructor() {
		super("Technician is not assigned to this maintenance interview");
	}
}
