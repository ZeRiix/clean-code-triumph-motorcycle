import { type Email, type FullName } from "domains/types/common";

export interface ClientDefinition {
	siret: FullName;
	email: Email | null;
	phone: string | null;
	address: string | null;
	isPartner: boolean;
}

export class ClientEntity {
	private constructor(
		public readonly definition: ClientDefinition,
	) { }

	public static create(definition: Omit<ClientDefinition, "isPartner">) {
		return new ClientEntity({
			...definition,
			isPartner: true,
		});
	}
}

