<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
	<footer class="bg-white shadow-md py-4">
		<div class="container mx-auto text-center text-gray-700">
			<p>&copy; {{ currentYear }}</p>
		</div>
	</footer>
</template>
