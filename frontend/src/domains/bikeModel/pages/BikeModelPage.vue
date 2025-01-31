<script setup lang="ts">
import { useGetBikeModels, type BikeModel } from "../composables/useGetBikeModels";

const currentPage = ref(0);

const { bikeModels, getBikeModels } = useGetBikeModels();

const cols: BigTableColDef<BikeModel>[] = [
	{
		title: "Name",
		getter: (index) => index.name,
	},
	{
		title: "Type",
		getter: (index) => index.type,
	},
	{
		title: "InterviewIntervalByKillometers",
		getter: (index) => index.interviewIntervalByKillometers,
	},
	{
		title: "InterviewIntervalByDay",
		getter: (index) => index.interviewIntervalByDay,
	},
];

function next() {
	if (bikeModels.value.length < 10) {
		return;
	}
	void getBikeModels(currentPage.value += 1);
}

function previous() {
	if (currentPage.value === 0) {
		return;
	}
	void getBikeModels(currentPage.value -= 1);
}
</script>

<template>
	<div class="py-8 mx-20">
		<section class="mt-8">
			<BigTable
				:cols="cols"
				:items="bikeModels"
				:current-page="currentPage + 1"
				@click-next="next"
				@click-previous="previous"
			/>
		</section>
	</div>
</template>
