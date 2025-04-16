<script setup lang="ts">
import { DEFAULT_FONT, getGlobalFont, setGlobalFont } from "@/types/font";
import { useDarkMode } from "@/utils/darkMode";
import { onMounted, ref, watch } from "vue";

const { darkMode, storeDarkMode } = useDarkMode();

const handleToggle = () => {
  storeDarkMode();
};

const selectedFont = ref(DEFAULT_FONT);
watch(selectedFont, () => setGlobalFont(selectedFont.value));
onMounted(() => (selectedFont.value = getGlobalFont()));
</script>

<template>
  <v-switch
    v-model="darkMode"
    label="Dark mode"
    @update:model-value="handleToggle"
  />
  <FontSelector v-model="selectedFont" />
</template>
