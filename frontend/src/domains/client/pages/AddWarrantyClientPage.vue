<script setup lang="ts">

import { routerPageName } from "@/router/routerPageName";
import { useFormClientWarranty } from "../composables/useFormClientWarranty";
import { router } from "@/router";

const params = useRouteParams({
	siret: zod.string(),
});
const { ClientWarantyForm, clientWarantyValues, checkClientWarantyForm } = useFormClientWarranty();

clientWarantyValues.clientSiret.value = params.value.siret;

async function submit() {
	const formFields = await checkClientWarantyForm();

	if (!formFields) {
		return;
	}

	if (formFields.startDate > formFields.endDate) {
		errorToast("Start date must be before end date");
		return;
	}

	return httpClient.post(
		"/clients/{clientSiret}/warranty",
		{
			params: {
				clientSiret: formFields.clientSiret,
			},
			body: {
				startDate: formFields.startDate.toISOString(),
				endDate: formFields.endDate.toISOString(),
				description: formFields.description,
			},
		},
	)
		.whenInformation("client.notfound", () => {
			errorToast("Client not found");
		})
		.whenInformation("warranty.created", async() => {
			successToast("Warranty added");
			await router.push({ name: routerPageName.CLIENT });
		});
}

</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
		<section class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
			<ClientWarantyForm @submit="submit">
				<PrimaryButton
					type="submit"
					class="w-full py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
				>
					Save
				</PrimaryButton>
			</ClientWarantyForm>
		</section>
	</div>
</template>
