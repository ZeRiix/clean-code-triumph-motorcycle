export class DomainError<
	GenericInformation extends string,
> extends Error {
	public information: GenericInformation;

	public constructor(information: GenericInformation) {
		super();
		this.information = information;
	}
}
