<script setup lang="ts">
</script>

<template>
	<div class="relative flex items-center justify-center min-h-screen bg-gray-100">
		<img
			src="../../../assets/images/bg-login.jpg"
			alt="Background"
			class="absolute right-0 top-0 h-4/4 w-1/2 object-cover opacity-50"
		>

		<div class="relative bg-white shadow-md rounded-lg p-8 max-w-md w-full z-10">
			<img
				src="/logo.png"
				alt="logo"
				class="h-20 mx-auto mb-6"
			>

			<h1 class="text-2xl font-bold text-center mb-6">
				Page Not Found
			</h1>

			<p class="text-center text-gray-700 mb-6">
				Sorry, the page you are looking for does not exist.
			</p>

			<router-link
				to="/"
				class="w-full py-2 px-4 bg-black text-white font-semibold rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black text-center block"
			>
				Go to Home
			</router-link>
		</div>
	</div>
</template>
