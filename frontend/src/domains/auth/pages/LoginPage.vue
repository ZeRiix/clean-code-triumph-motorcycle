<script setup lang="ts">
import { useFormLogin } from "../composables/useFormLogin";

const { LoginForm, checkLoginForm, resetLoginForm } = useFormLogin();

const MILLI_SECONDS = 1000;
async function submit() {
	console.log("submit");
}
</script>

<template>
	<div class="flex flex-col bg-gray-200 items-center justify-center">
		<img
			src="/logo.png"
			alt="logo"
			class="h-20 mb-4"
		>

		<h1 class="text-3xl font-bold mb-4">
			Login Form
		</h1>

		<LoginForm
			@submit="submit"
			class="max-w-[500px] w-[80%]"
		>
			<PrimaryButton
				type="submit"
				class="col-span-12 bg-black text-white"
			>
				Login
			</PrimaryButton>
		</LoginForm>
	</div>
</template>
