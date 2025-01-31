import { router } from "@/router";
import { routerPageName } from "@/router/routerPageName";

export function useFormBike(vin?: string) {
	const { Form, checkForm, resetForm, values } = useFormBuilder({
		vin: {
			type: "text",
			placeholder: "Vehicule Identification Number",
			label: "VIN",
			disabled: !!vin,
			zodSchema: zod.string()
				.regex(
					/^[A-Z0-9]{17}/,
					"17 characters of uppercase letters and numbers",
				),
		},
		modelName: {
			type: "text",
			placeholder: "Bike model name",
			label: "Model name",
			disabled: !!vin,
			zodSchema: zod.string()
				.min(2, "Minimum 2 characters")
				.max(50, "Maximum 50 characters"),
		},
		registration: {
			type: "text",
			placeholder: "Registration",
			label: "Registration",
			disabled: !!vin,
			zodSchema: zod.string().regex(
				/^[A-Z]{2}-\d{3}-[A-Z]{2}/,
				"XX-000-XX",
			),
		},
		purchaseDate: {
			type: "date",
			label: "Purchase date",
			disabled: !!vin,
			zodSchema: zod.coerce.date({ message: "Invalid date" }),
		},
		mileage: {
			type: "number",
			placeholder: "Mileage",
			label: "Mileage",
			zodSchema: zod.number().positive({ message: "Positive number" }),
		},
		lastInterviewDate: {
			type: "date",
			label: "Last interview date",
			disabled: !!vin,
			zodSchema: zod.coerce.date({ message: "Invalid date" }),
		},
		factoryYear: {
			type: "number",
			placeholder: "Factory year",
			label: "Factory year",
			disabled: !!vin,
			zodSchema: zod.number()
				.refine((factoryYear) => {
					if (factoryYear < 1900) {
						return false;
					}

					if (factoryYear > new Date().getFullYear()) {
						return false;
					}

					return true;
				}, "Invalid factory year"),
		},
	});

	if (vin) {
		void httpClient.get(
			"/bikes",
			{
				query: {
					page: String(0),
					vin: vin,
				},
			},
		).whenInformation("bikes.get", async({ body }) => {
			const bike = body.pop();

			if (!bike) {
				errorToast("Bike not found");
				await router.push({ name: routerPageName.HOME });
				return;
			}

			values.vin.value = bike.vin;
			values.modelName.value = bike.modelName;
			values.registration.value = bike.registration;
			values.purchaseDate.value = bike.purchaseDate;
			values.mileage.value = bike.mileage;
			values.lastInterviewDate.value = bike.lastInterviewDate;
			values.factoryYear.value = bike.factoryYear;
		});
	}

	return {
		BikeForm: Form,
		checkBikeForm: checkForm,
		resetBikeForm: resetForm,
		bikeFormValues: values,
	};
}
