<script setup lang="ts">
import { DocumentPlusIcon } from "@heroicons/vue/24/solid";
import { PlusIcon } from "lucide-vue-next";
import { routerPageName } from "@/router/routerPageName";
import { type SparePart, useGetSparePart } from "../composables/useGetSparePart";
import { useFormSparePart } from "../composables/useFormSparePart";

const currentPage = ref(0);
const showForm = ref(false);

const { spareParts, getSparePart } = useGetSparePart();
const { SparePartForm, checkSparePartForm } = useFormSparePart();

const cols: BigTableColDef<SparePart>[] = [
	{
		title: "Reference",
		getter: (index) => index.reference,
	},
	{
		title: "Name",
		getter: (index) => index.name,
	},
	{
		title: "Reorder Level",
		getter: (index) => index.reorderLevel,
	},
	{
		title: "Factured Price",
		getter: (index) => index.facturedPrice,
	},
	{
		title: "Stock",
		getter: (index) => index.stock,
	},
	{
		title: "actions",
		slotName: "actions",
	},
];

function next() {
	if (spareParts.value.length < 10) {
		return;
	}
	void getSparePart(currentPage.value += 1);
}

function previous() {
	if (currentPage.value === 0) {
		return;
	}
	void getSparePart(currentPage.value -= 1);
}

function toggleForm() {
	showForm.value = !showForm.value;
}

async function submitCreate() {
	const formFields = await checkSparePartForm();

	if (!formFields) {
		return;
	}

	return httpClient.post(
		"/spare-part",
		{
			body: {
				reference: formFields.reference,
				name: formFields.name,
				reorderLevel: formFields.reorderLevel,
				facturedPrice: formFields.facturedPrice,
			},
		},
	)
		.whenInformation("sparePart.created", () => {
			void getSparePart(currentPage.value);
			successToast(`Spare part created${formFields.name}`);
		})
		.whenInformation("sparePart.alreadyExist", () => {
			errorToast("reference already exist");
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
				{{ showForm ? 'Close' : 'New SparePart' }}
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
				<SparePartForm
					@submit="submitCreate"
					class="mx-40"
				>
					<PrimaryButton
						type="submit"
						class="w-full col-span-12 py-2 bg-black text-white rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
					>
						Save
					</PrimaryButton>
				</SparePartForm>
			</section>
		</Transition>

		<section class="mt-8">
			<BigTable
				:cols="cols"
				:items="spareParts"
				:current-page="currentPage + 1"
				@click-next="next"
				@click-previous="previous"
			>
				<template #actions="{ item }">
					<router-link
						:to="{ name: routerPageName.COMMAND_SPARE_PART, params: { id: item.reference } }"
						class="inline-flex items-center justify-center p-2 bg-black hover:bg-gray-800 text-white rounded-md shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
					>
						<component
							:is="DocumentPlusIcon"
							class="h-5 w-5"
						/>
					</router-link>
				</template>
			</BigTable>
		</section>
	</div>
</template>
