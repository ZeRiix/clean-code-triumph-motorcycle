<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { ComboboxRoot, useForwardPropsEmits, type ComboboxRootEmits, type ComboboxRootProps } from "radix-vue";
import { cn } from "@/lib/utils";

const props = withDefaults(defineProps<ComboboxRootProps & { class?: HTMLAttributes["class"] }>(), {
	open: true,
	modelValue: "",
});

const emit = defineEmits<ComboboxRootEmits>();

const delegatedProps = computed(() => {
	// eslint-disable-next-line id-length
	const { class: _, ...delegated } = props;

	return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
	<ComboboxRoot v-bind="forwarded"
		:class="cn('flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground', props.class)">
		<slot />
	</ComboboxRoot>
</template>
