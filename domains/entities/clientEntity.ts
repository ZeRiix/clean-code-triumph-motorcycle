import { EmailType } from "domains/types/common/emailType";
import { NameType } from "domains/types/common/nameType";


export interface ClientDefinition {
    name: NameType; // Full name of the client
    email: EmailType; // Email of the client
    phone: string; // Phone number of the client
    address: string; // Address of the client
    status?: boolean;
}

export class ClientEntity {
    private constructor(
        public readonly definition: ClientDefinition,
    ) { }

    public static create(definition: ClientDefinition): ClientEntity {
        return new ClientEntity({
            ...definition,
            status: true, // default
        });
    }

    public static updateClientProfile(
        definition: ClientDefinition,
        newName: NameType,
        newEmail: EmailType,
        newPhone: string,
        newAddress: string,
    ): ClientEntity {
        return new ClientEntity({
            ...definition,
            name: newName,
            email: newEmail,
            phone: newPhone,
            address: newAddress,
        });
    }

    public desactivate(): ClientEntity {
        return new ClientEntity({
            ...this.definition,
            status: false,
        });
    }
}

