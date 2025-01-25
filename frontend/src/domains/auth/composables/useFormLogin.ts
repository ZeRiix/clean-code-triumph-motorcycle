/* eslint-disable @typescript-eslint/no-magic-numbers */
export function useFormLogin() {
	const { Form, checkForm, resetForm } = useFormBuilder({
		email: {
			type: "text",
			label: "Email",
			defaultValue: "",
			zodSchema: zod.string()
				.max(255)
				.min(2),
		},
		password: {
			type: "text",
			label: "Password",
			defaultValue: "",
			zodSchema: zod.string()
				.max(255)
				.min(2),
		},
	});

	return {
		LoginForm: Form,
		checkLoginForm: checkForm,
		resetLoginForm: resetForm,
	};
}
