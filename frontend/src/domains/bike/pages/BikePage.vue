<script setup lang="ts">
import { type Bike, useGetBikes } from "../composables/useGetBikes";
import { useFormBike } from "../composables/useFormBike";
import { PencilSquareIcon } from "@heroicons/vue/24/solid";
import { PlusIcon } from "lucide-vue-next";
import { routerPageName } from "@/router/routerPageName";

const currentPage = ref(0);
const showForm = ref(false);

const { bikes, getBikes } = useGetBikes();
const { BikeForm, checkBikeForm } = useFormBike();

const cols: BigTableColDef<Bike>[] = [
	{
		title: "VIN",
		getter: (index) => index.vin,
	},
	{
		title: "Model Name",
		getter: (index) => index.modelName,
	},
	{
		title: "Registration",
		getter: (index) => index.registration,
	},
	{
		title: "Factory Year",
		getter: (index) => index.factoryYear,
	},
	{
		title: "Mileage",
		getter: (index) => index.mileage,
	},
	{
		title: "Purchase Date",
		getter: (index) => index.purchaseDate,
	},
	{
		title: "Still In Circulation",
		getter: (index) => index.stillInCirculation,
		slotName: "stillInCirculation",
	},
	{
		title: "Last Interview Date",
		getter: (index) => index.lastInterviewDate,
	},
	{
		title: "actions",
		slotName: "actions",
	},
];

function next() {
	if (bikes.value.length < 10) {
		return;
	}
	void getBikes(currentPage.value += 1);
}

function previous() {
	if (currentPage.value === 0) {
		return;
	}
	void getBikes(currentPage.value -= 1);
}

function toggleForm() {
	showForm.value = !showForm.value;
}

async function submitCreate() {
	const formFields = await checkBikeForm();

	if (!formFields) {
		return;
	}

	return httpClient.post(
		"/bikes",
		{
			body: {
				vin: formFields.vin!,
				modelName: formFields.modelName!,
				registration: formFields.registration!,
				purchaseDate: [formFields.purchaseDate!.toISOString(), formFields.factoryYear!],
				mileage: formFields.mileage,
				lastInterviewDate: formFields.lastInterviewDate!.toISOString(),
				factoryYear: formFields.factoryYear!,
			},
		},
	)
		.whenInformation("bike.created", () => {
			void getBikes(currentPage.value);
			successToast(`Bike created${formFields.vin}`);
		})
		.whenInformation("bike.vin.notavailable", () => {
			errorToast("VIN already exists");
		})
		.whenInformation("bikeModel.notfound", () => {
			errorToast("Model not found");
		});
}

</script>

<template>
	<div class="py-8 mx-20">
		<PrimaryButton
			@click="toggleForm"
			class="flex items-center space-x-2 px-4 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
		>
			<div class="flex items-center gap-2">
				{{ showForm ? 'Close' : 'New Bike' }}
				<component
					:is="PlusIcon"
					class="w-5 h-5"
					:class="{ 'rotate-45': showForm }"
				/>
			</div>
		</PrimaryButton>

		<Transition
			enter-active-class="duration-300 ease-out"
			enter-from-class="transform opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="duration-200 ease-in"
			leave-from-class="opacity-100"
			leave-to-class="transform opacity-0"
		>
			<section
				v-if="showForm"
				class="my-6"
			>
				<BikeForm
					@submit="submitCreate"
					class="mx-40"
				>
					<PrimaryButton
						type="submit"
						class="w-full col-span-12 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
					>
						Save
					</PrimaryButton>
				</BikeForm>
			</section>
		</Transition>

		<section class="mt-8">
			<BigTable
				:cols="cols"
				:items="bikes"
				:current-page="currentPage + 1"
				@click-next="next"
				@click-previous="previous"
			>
				<template #stillInCirculation="{ item }">
					{{ item.stillInCirculation ? "Yes" : "No" }}
				</template>

				<template #actions="{ item }">
					<router-link
						:to="{ name: routerPageName.BIKE_EDIT, params: { id: item.vin } }"
						class="inline-flex items-center justify-center p-2 bg-black hover:bg-gray-800 text-white rounded-md shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
					>
						<component
							:is="PencilSquareIcon"
							class="h-5 w-5"
						/>
					</router-link>
				</template>
			</BigTable>
		</section>
	</div>
</template>
