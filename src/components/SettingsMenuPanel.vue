<script setup lang="ts">
const { icon, label } = defineProps<{ icon: string; label: string }>();
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title class="sub-panel-title">
      <v-icon :icon="icon" />
      {{ label }}
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <slot />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
