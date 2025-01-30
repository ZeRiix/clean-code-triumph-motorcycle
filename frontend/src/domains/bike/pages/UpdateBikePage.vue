<script setup lang="ts">
import { router } from "@/router";
import { useFormBike } from "../composables/useFormBike";
import { routerPageName } from "@/router/routerPageName";

const routeParams = useRouteParams({
	id: zod.string(),
});

const { BikeForm, checkBikeForm } = useFormBike(routeParams.value.id);

async function submit() {
	const formFields = await checkBikeForm();

	if (!formFields) {
		return;
	}

	return httpClient.patch(
		"/bikes/{vin}/mielage",
		{
			params: {
				vin: routeParams.value.id,
			},
			body: {
				mileage: formFields.mileage,
			},
		},
	)
		.whenInformation("bike.mileageUpdated", async() => {
			successToast("Mileage updated");
			await router.push({ name: routerPageName.BIKE });
		}).whenInformation("bike.mileageUpdateFailed", () => {
			errorToast("Mileage update failed");
		})
		.whenInformation("bike.notfound", () => {
			errorToast("Bike not found");
		})
		.whenInformation("manager.notfoud", async() => {
			errorToast("You are not a manager");
			await router.push({ name: routerPageName.HOME });
		});
}

</script>

<template>
	<div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
		<section class="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
			<BikeForm @submit="submit">
				<PrimaryButton
					type="submit"
					class="w-full py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
				>
					Save
				</PrimaryButton>
			</BikeForm>
		</section>
	</div>
</template>
