<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import { ComboboxSeparator, type ComboboxSeparatorProps } from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps<ComboboxSeparatorProps & { class?: HTMLAttributes["class"] }>();

const delegatedProps = computed(() => {
	// eslint-disable-next-line id-length
	const { class: _, ...delegated } = props;

	return delegated;
});
</script>

<template>
	<ComboboxSeparator v-bind="delegatedProps" :class="cn('-mx-1 h-px bg-border', props.class)">
		<slot />
	</ComboboxSeparator>
</template>
