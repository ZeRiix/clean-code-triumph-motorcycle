/* eslint-disable @typescript-eslint/no-magic-numbers */
export function useFormLogin() {
	const { Form, checkForm, resetForm } = useFormBuilder({
		email: {
			type: "text",
			label: "Email",
			placeholder: "Email",
			zodSchema: zod.string()
				.max(255)
				.min(2),
		},
		password: {
			type: "text",
			label: "Password",
			placeholder: "Password",
			zodSchema: zod.string()
				.max(255)
				.min(8),
		},
	});

	return {
		LoginForm: Form,
		checkLoginForm: checkForm,
		resetLoginForm: resetForm,
	};
}
