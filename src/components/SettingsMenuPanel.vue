<script setup lang="ts">
const { icon, label } = defineProps<{ icon: string; label: string }>();
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title class="sub-panel-title">
      <v-icon :icon="icon" class="mr-1" />
      {{ label }}
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <slot />
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
