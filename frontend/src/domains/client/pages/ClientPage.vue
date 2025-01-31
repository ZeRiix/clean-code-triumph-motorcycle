<script setup lang="ts">
import { routerPageName } from "@/router/routerPageName";
import { useGetClients, type Client } from "../composables/useGetClient";
import { PlusIcon } from "lucide-vue-next";

const currentPage = ref(0);

const { clients, getClients } = useGetClients();

const cols: BigTableColDef<Client>[] = [
	{
		title: "Siret",
		getter: (index) => index.siret,
	},
	{
		title: "Phone",
		getter: (index) => index.phone,
	},
	{
		title: "Address",
		getter: (index) => index.address,
	},
	{
		title: "Is Partner",
		getter: (index) => index.isPartner,
	},
];

function next() {
	if (clients.value.length < 10) {
		return;
	}
	void getClients(currentPage.value += 1);
}

function previous() {
	if (currentPage.value === 0) {
		return;
	}
	void getClients(currentPage.value -= 1);
}
</script>

<template>
	<div class="py-8 mx-20">
		<section class="mt-8">
			<BigTable
				:cols="cols"
				:items="clients"
				:current-page="currentPage + 1"
				@click-next="next"
				@click-previous="previous"
			>
				<template #stillInCirculation="{ item }">
					{{ item.isPartner ? "Yes" : "No" }}
				</template>

				<template #actions="{ item }">
					<router-link
						:to="{ name: routerPageName.ADD_WARANTY_CLIENT, params: { id: item.siret } }"
						class="inline-flex items-center justify-center p-2 bg-black hover:bg-gray-800 text-white rounded-md shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
					>
						<component
							:is="PlusIcon"
							class="h-5 w-5"
						/>
					</router-link>
				</template>
			</BigTable>
		</section>
	</div>
</template>
