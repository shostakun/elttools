<script setup lang="ts">
import { useDarkMode } from "@/utils/darkMode";

const { darkMode, storeDarkMode } = useDarkMode();

const handleToggle = () => {
  storeDarkMode();
};
</script>

<template>
  <v-switch
    v-model="darkMode"
    label="Dark mode"
    @update:model-value="handleToggle"
  />
</template>
