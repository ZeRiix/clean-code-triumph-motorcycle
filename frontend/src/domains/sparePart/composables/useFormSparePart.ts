export function useFormSparePart() {
	const { Form, checkForm, resetForm, values } = useFormBuilder({
		reference: {
			type: "text",
			placeholder: "Reference",
			label: "Reference",
			zodSchema: zod.string().regex(/^[a-zA-Z0-9]{1,20}$/),
		},
		name: {
			type: "text",
			placeholder: "Name",
			label: "Name",
			zodSchema: zod.string().min(1).max(50),
		},
		reorderLevel: {
			type: "number",
			placeholder: "Reorder Level",
			label: "Reorder Level",
			zodSchema: zod.number().min(0),
		},
		facturedPrice: {
			type: "number",
			placeholder: "Factured Price",
			label: "Factured Price",
			zodSchema: zod.number().min(0),
		},
	});

	return {
		SparePartForm: Form,
		checkSparePartForm: checkForm,
		resetSparePartForm: resetForm,
		sparePartValues: values,
	};
}
