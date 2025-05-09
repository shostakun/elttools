<script setup lang="ts">
import { mdiHome } from "@mdi/js";
import { useSlots } from "vue";

const slots = useSlots();
</script>

<template>
  <v-toolbar collapse class="tool-toolbar">
    <v-btn :icon="mdiHome" to="/" />
    <v-divider v-if="slots.default" inset vertical />
    <slot />
  </v-toolbar>
</template>

<style lang="scss" scoped>
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
</style>
