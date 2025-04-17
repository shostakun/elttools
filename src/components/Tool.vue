<script setup lang="ts">
import { type Tool } from "@/types";
import { mdiHome } from "@mdi/js";
import { useSlots } from "vue";
import classNames from "classnames";

const { containerClass, tool } = defineProps<{
  containerClass?: string;
  tool: Tool;
}>();

const slots = useSlots();
</script>

<template>
  <div :class="classNames('tool-container', containerClass)">
    <slot />
  </div>

  <ToolMenu :tool="tool">
    <slot name="tool-menu" />
  </ToolMenu>

  <v-toolbar collapse class="tool-toolbar">
    <v-btn :icon="mdiHome" to="/" />
    <v-divider v-if="slots.toolbar" inset vertical />
    <slot name="toolbar" />
  </v-toolbar>
</template>

<style lang="scss">
.tool-toolbar {
  left: 0;
  max-width: unset !important;
  padding-left: 0.25rem;
  padding-right: 0.5rem;
  position: absolute !important;
  top: 0;
  width: fit-content !important;

  & .v-toolbar__content {
    gap: 0.5rem;
  }
}

.tool-container {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
