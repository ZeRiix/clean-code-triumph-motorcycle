<script setup lang="ts">
import { useFormLogin } from "../composables/useFormLogin";

const { LoginForm, checkLoginForm, resetLoginForm } = useFormLogin();
const { token: tokenRef } = useToken();

async function submit() {
	const formFields = await checkLoginForm();

	if (!formFields) {
		return;
	}

	return httpClient.post(
		"/login",
		{
			body: {
				email: formFields.email,
				password: formFields.password,
			},
		},
	)
		.whenInformation("user.logged", ({ body }) => {
			tokenRef.value = body.token;
		})
		.whenError(() => {
			resetLoginForm();
			errorToast("Invalid email or password");
		});
}

</script>

<template>
	<div class="relative flex items-center justify-center min-h-screen bg-gray-100">
		<img
			src="../../../assets/images/bg-login.jpg"
			alt="Motorcycle"
			class="absolute right-0 top-0 h-4/4 w-1/2 object-cover opacity-50"
		>

		<div class="relative bg-white shadow-md rounded-lg p-8 max-w-md w-full z-10">
			<img
				src="/logo.png"
				alt="logo"
				class="h-20 mx-auto mb-6"
			>

			<h1 class="text-2xl font-bold text-center mb-6">
				Login
			</h1>

			<LoginForm @submit="submit">
				<PrimaryButton
					type="submit"
					class="col-span-12 py-2 px-4 bg-black text-white font-semibold rounded-md shadow-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
				>
					Login
				</PrimaryButton>
			</LoginForm>
		</div>
	</div>
</template>
