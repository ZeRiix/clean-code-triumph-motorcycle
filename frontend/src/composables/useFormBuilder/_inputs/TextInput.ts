/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable vue/require-prop-types */
import { effect } from "vue";
import type { BaseInputDef, InputProps } from "../types";
import PrimaryInput from "@/components/PrimaryInput.vue";

export interface TextInputProps extends InputProps<string> {
	placeholder?: string;
}

export interface TextInputDef extends BaseInputDef {
	type: "text";
	defaultValue?: string;
	placeholder?: string;
}

export const TextInput = defineComponent({
	props: ["label", "modelValue", "zodSchema", "name", "placeholder", "formId", "inputProps"],
	setup(props: TextInputProps, { expose, emit }) {
		const toValidated = ref(false);
		const errorMessage = ref("");

		async function submit() {
			if (props.zodSchema) {
				const result = await props.zodSchema.safeParseAsync(props.modelValue);
				if (!result.success) {
					toValidated.value = true;
					throw new Error(result.error.issues[0].message);
				} else {
					return result.data;
				}
			}
			return props.modelValue;
		}

		expose({ submit });

		effect(async() => {
			if (toValidated.value && props.zodSchema) {
				const result = await props.zodSchema.safeParseAsync(props.modelValue);
				if (!result.success) {
					errorMessage.value = result.error.issues[0].message;
					return;
				}
			}
			toValidated.value = false;
			errorMessage.value = "";
		});

		return () => h(
			"div",
			{
				class: "flex flex-col gap-2",
			},
			[
				props.label
					? h(
						"label",
						{
							class: "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
							for: `${props.name}-${props.formId}`,
						},
						props.label,
					)
					: null,
				h(
					PrimaryInput,
					{
						...props.inputProps,
						type: "text",
						id: `${props.name}-${props.formId}`,
						modelValue: props.modelValue,
						placeholder: props.placeholder,
						"onUpdate:modelValue": (value: unknown) => {
							emit("update:modelValue", value);
						},
					},
				),
				props.zodSchema
					? h(
						"div",
						{
							class: "min-h-6",
						},
						[
							h(
								"small",
								{
									class: "text-invalide",
								},
								errorMessage.value,
							),
						],
					)
					: null,
			],
		);
	},
});

