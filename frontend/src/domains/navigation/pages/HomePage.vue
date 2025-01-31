<script setup lang="ts">
import { HomeIcon, UserIcon, CogIcon, ChartBarIcon } from "@heroicons/vue/24/solid";
import NaviguateSection from "../components/NaviguateSection.vue";
import { BikeIcon, FileBox } from "lucide-vue-next";

const sections = {
	"Main Section": [
		{
			name: "Dashboard",
			path: "/dashboard",
			icon: HomeIcon,
		},
		{
			name: "Bike",
			path: "/bikes",
			icon: BikeIcon,
		},
		{
			name: "Bike Models",
			path: "/bike-models",
			icon: FileBox,
		},
		{
			name: "Reports",
			path: "reports",
			icon: ChartBarIcon,
		},
	],
	"Additional Section": [
		{
			name: "Analytics",
			path: "/analytics",
			icon: ChartBarIcon,
		},
		{
			name: "Users",
			path: "/users",
			icon: UserIcon,
		},
		{
			name: "Preferences",
			path: "/preferences",
			icon: CogIcon,
		},
		{
			name: "Logs",
			path: "/logs",
			icon: ChartBarIcon,
		},
	],
};
</script>

<template>
	<div class="relative flex items-center justify-center min-h-screen bg-gray-100">
		<img
			src="../../../assets/images/bg-login.jpg"
			alt="Background"
			class="absolute right-0 top-0 h-4/4 w-1/2 object-cover opacity-50 z-0"
		>

		<div class="relative bg-white shadow-md rounded-lg p-8 max-w-4xl w-full z-10">
			<div
				v-for="(items, title) in sections"
				:key="title"
			>
				<NaviguateSection
					:title="title"
					:items="items"
				/>
			</div>
		</div>
	</div>
</template>
