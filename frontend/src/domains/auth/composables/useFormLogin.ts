
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
				.min(2),
		},
	});

	return {
		LoginForm: Form,
		checkLoginForm: checkForm,
		resetLoginForm: resetForm,
	};
}
