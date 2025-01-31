export function useFormCommandSparePart(reference?: string) {
	const { Form, checkForm, resetForm, values } = useFormBuilder({
		reference: {
			type: "text",
			placeholder: "Reference",
			label: "Reference",
			defaultValue: reference,
			zodSchema: zod.string().regex(
				/^[a-zA-Z0-9]{1,20}$/,
				{ message: "Reference must be alphanumeric and have 1-20 characters" },
			),
		},
		quantity: {
			type: "number",
			placeholder: "Quantity",
			label: "Quantity",
			zodSchema: zod.number().int().positive({ message: "Quantity must be positive" }),
		},
		unitPriceTTC: {
			type: "number",
			placeholder: "Unit Price TTC",
			label: "Unit Price TTC",
			zodSchema: zod.number().min(0, { message: "Unit Price TTC must be positive" }),
		},
		dayDeliveryDelay: {
			type: "number",
			placeholder: "Day Delivery Delay",
			label: "Day Delivery Delay",
			zodSchema: zod.number().int().positive({ message: "Day Delivery Delay must be positive" }),
		},
	});

	return {
		CommandSparePartForm: Form,
		checkCommandSparePartForm: checkForm,
		resetCommandSparePartForm: resetForm,
		commandSparePartFormValues: values,
	};
}
