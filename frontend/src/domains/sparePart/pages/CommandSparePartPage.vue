<script setup lang="ts">

import { routerPageName } from "@/router/routerPageName";
import { useFormCommandSparePart } from "../composables/useFormCommandSparePart";
import { router } from "@/router";

const params = useRouteParams({
	reference: zod.string(),
});
const { CommandSparePartForm, checkCommandSparePartForm } = useFormCommandSparePart(params.value.reference);

async function submit() {
	const formFields = await checkCommandSparePartForm();

	if (!formFields) {
		return;
	}

	return httpClient.post(
		"/spare-part/{sparePartReference}/command",
		{
			params: {
				sparePartReference: formFields.reference,
			},
			body: {
				quantity: formFields.quantity,
				unitPriceTTC: formFields.unitPriceTTC,
				dayDeliveryDelay: formFields.dayDeliveryDelay,
			},
		},
	)
		.whenInformation("sparePart.notfound", () => {
			errorToast("Spare part not found");
		})
		.whenInformation("sparePartCommanded.created", async() => {
			successToast("Spare part commanded");
			await router.push({ name: routerPageName.SPARE_PART });
		});
}

</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
		<section class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
			<CommandSparePartForm @submit="submit">
				<PrimaryButton
					type="submit"
					class="w-full py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
				>
					Save
				</PrimaryButton>
			</CommandSparePartForm>
		</section>
	</div>
</template>
