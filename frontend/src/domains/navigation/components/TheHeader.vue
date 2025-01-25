<script setup lang="ts">

interface Link {
	url: string;
	name: string;
}

const links: Link[] = [
	{
		url: "#",
		name: "Test",
	},
];

</script>

<template>
	<header class="bg-white shadow-md">
		<div class="container mx-auto px-4 py-4 flex items-center justify-between">
			<div class="flex items-center">
				<img
					src="/logo.png"
					alt="logo"
					class="h-10 mr-6"
				>

				<nav class="flex space-x-4">
					<RouterLink
						v-for="link in links"
						:key="link.url"
						:to="link.url"
						class="text-gray-700 hover:text-black"
					>
						{{ link.name }}
					</RouterLink>
				</nav>
			</div>
		</div>
	</header>
</template>

