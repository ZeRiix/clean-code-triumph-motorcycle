/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable func-style */
/* eslint-disable no-param-reassign */
import type { FunctionalComponent, VNode, Ref } from "vue";
import type { FormInputDef, FormInputToRecordRef, GetSlots, ResultCheckForm, SlotObject } from "./types";

const inputMapper = {
	text: TextInput,
	number: NumberInput,
	combo: ComboBoxInput,
	checkbox: CheckboxInput,
	select: SelectInput,
	textarea: TextareaInput,
	date: DateInput,
	radio: RadioGroupInput,
	custom: CustomInput,
};

let count = 0;

export function useFormBuilder<
	inputDef extends Record<string, FormInputDef | Ref<FormInputDef>>,
>(
	formInputs: inputDef,
	tag: keyof HTMLElementTagNameMap = "form",
) {
	const formId = `${count += 1}`;

	const values = Object.fromEntries(
		Object.keys(formInputs).map((name) => [name, ref()]),
	);

	function resetForm() {
		Object.entries(formInputs).forEach(([name, input]) => {
			input = isRef(input) ? input.value : input;

			values[name].value = typeof input.defaultValue === "function"
				? input.defaultValue()
				: input.defaultValue;
		});
	}

	resetForm();

	let inputRefs: VNode[] = [];

	const childInput = (slots: SlotObject) => {
		inputRefs = [];
		return Object.entries(formInputs).map(
			([name, input]) => {
				input = isRef(input) ? input.value : input;
				const { type, cols, disabled, ...reste } = input;

				if (disabled) {
					return null;
				}

				const component = h(
					inputMapper[type],
					{
						style: {
							"grid-column": cols
								? `span ${cols} / span ${cols}`
								: "span 12 / span 12",
							...(type === "custom" && !slots[name] ? { display: "none" } : {}),
						},
						modelValue: values[name].value,
						"onUpdate:modelValue": (value: unknown) => {
							values[name].value = value;
						},
						name,
						key: name,
						formId,
						...reste,
					},
					type === "custom"
						? () => slots[name]?.({
							modelValue: values[name].value,
							onUpdate: (value) => {
								values[name].value = value;
							},
							formId,
						})
						: undefined,
				);

				inputRefs.push(component);
				return component;
			},
		);
	};

	async function checkForm() {
		let valid = true;

		const resultValue: Record<string, unknown> = {};

		for (const ref of inputRefs) {
			const key = ref.component?.props.name;
			const submit = ref.component?.exposed?.submit;
			if (
				typeof key !== "string"
				|| typeof submit !== "function"
			) {
				throw new Error("Input missign key or submit function");
			}
			try {
				resultValue[key] = await submit();
			} catch {
				valid = false;
			}
		}

		return valid
			? resultValue as ResultCheckForm<inputDef>
			: null;
	}

	const Form: FunctionalComponent<
		unknown,
		{ submit: [event: Event] },
		{ default?(): never } & GetSlots<inputDef>
	> = (props, { slots: wrongTypedSlots }) => {
		const slots = wrongTypedSlots as { default?(): never };

		return h(
			tag,
			{
				class: "grid grid-cols-12 gap-3",
				onSubmit: (event) => {
					event.preventDefault();
				},
			},
			// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
			[childInput(slots), slots.default?.()],
		);
	};
	return {
		Form,
		values: values as FormInputToRecordRef<inputDef>,
		inputRefs,
		checkForm,
		resetForm,
		formId,
	};
}
