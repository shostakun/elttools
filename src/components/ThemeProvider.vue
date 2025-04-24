<script setup lang="ts">
import { isDarkMode } from "@/utils/darkMode";
import { onMounted, onUnmounted, provide, ref, watch } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const darkMode = ref(isDarkMode(theme.global.current.value.dark));

const handleDarkPreferenceChange = (event: MediaQueryListEvent) => {
  darkMode.value = isDarkMode(event.matches);
};

watch(darkMode, () => (theme.global.name.value = darkMode.value ? "dark" : "light"), {
  immediate: true,
});

const darkPreferenceMatch = window.matchMedia("(prefers-color-scheme: dark)");

onMounted(() => darkPreferenceMatch.addEventListener("change", handleDarkPreferenceChange));

onUnmounted(() => darkPreferenceMatch.removeEventListener("change", handleDarkPreferenceChange));

provide("darkMode", darkMode);
</script>

<template>
  <slot />
</template>
