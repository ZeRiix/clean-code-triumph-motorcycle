import { type Email, type FullName } from "domains/types/common";

export interface ClientDefinition {
	fullName: FullName;
	email: Email;
	phone: string;
	address: string;
	status: boolean;
}

export class ClientEntity {
	private constructor(
		public readonly definition: ClientDefinition,
	) { }

	public static create(definition: Omit<ClientDefinition, "status">) {
		return new ClientEntity({
			...definition,
			status: true,
		});
	}
}

