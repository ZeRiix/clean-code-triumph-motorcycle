export function useFormClientWarranty() {
	const { Form, checkForm, resetForm, values } = useFormBuilder({
		clientSiret: {
			type: "text",
			placeholder: "Client Siret",
			zodSchema: zod.string().length(14),
			label: "Client Siret",
		},
		startDate: {
			type: "date",
			label: "Start Date",
			zodSchema: zod.coerce.date({ message: "Invalid date" }),
		},
		endDate: {
			type: "date",
			label: "End Date",
			zodSchema: zod.coerce.date({ message: "Invalid date" }),
		},
		description: {
			type: "text",
			placeholder: "Description",
			zodSchema: zod.string().nullable(),
			label: "Description",
		},
	});

	return {
		ClientWarantyForm: Form,
		checkClientWarantyForm: checkForm,
		resetClientWarantyForm: resetForm,
		clientWarantyValues: values,
	};
}
