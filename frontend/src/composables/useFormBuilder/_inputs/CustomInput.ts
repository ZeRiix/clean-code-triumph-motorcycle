/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable vue/require-prop-types */
import { effect } from "vue";
import type { BaseInputDef, InputProps } from "../types";

export type CutsomInputProps = InputProps<string>;

export interface CustomInputDef extends BaseInputDef {
	type: "custom";
	defaultValue?: unknown;
}

export const CustomInput = defineComponent({
	props: ["label", "modelValue", "zodSchema", "name", "formId", "inputProps"],
	setup(props: CutsomInputProps, { expose, slots }) {
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
				slots.default?.(),
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

