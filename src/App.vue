<script setup lang="ts">
import { useDarkMode } from "./utils/darkMode";
// Detect dark mode changes when settings component isn't mounted.
useDarkMode();
</script>

<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style lang="scss">
html {
  overflow-y: auto;
}
</style>
