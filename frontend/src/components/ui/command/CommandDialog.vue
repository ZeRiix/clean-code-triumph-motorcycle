<script setup lang="ts">
import { useForwardPropsEmits, type DialogRootEmits, type DialogRootProps } from "radix-vue";
import TheCommand from "./TheCommand.vue";
import { TheDialog, DialogContent } from "@/components/ui/dialog";

const props = defineProps<DialogRootProps>();
const emits = defineEmits<DialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
	<TheDialog v-bind="forwarded">
		<DialogContent class="overflow-hidden p-0 shadow-lg">
			<TheCommand
				class="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
				<slot />
			</TheCommand>
		</DialogContent>
	</TheDialog>
</template>
