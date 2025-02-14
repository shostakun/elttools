<script setup lang="ts">
import { mdiInformation } from "@mdi/js";

const { description } = defineProps<{ description: string }>();
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title class="sub-panel-title">
      <v-icon :icon="mdiInformation" />
      About
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      {{ description }}
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
