<script setup lang="ts">
import { RouterLink } from "vue-router";

interface SectionItem {
	name: string;
	path: string;
	icon: unknown;
}

defineProps<{
	title: string;
	items: SectionItem[];
}>();
</script>

<template>
	<div class="mb-8">
		<h2 class="text-xl font-bold mb-4">
			{{ title }}
		</h2>

		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
			<div
				v-for="item in items"
				:key="item.name"
				class="flex flex-col items-center"
			>
				<RouterLink
					:to="{ path: item.path }"
					class="w-full"
				>
					<div class="w-full py-4 px-6 bg-black text-white font-semibold rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black flex flex-col items-center">
						<component
							:is="item.icon"
							class="h-8 w-8 mb-2"
						/>
						{{ item.name }}
					</div>
				</RouterLink>
			</div>
		</div>
	</div>
</template>

