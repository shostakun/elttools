<script setup lang="ts">
import { mdiHome } from "@mdi/js";

const baseUrl = import.meta.env.VITE_BASE_URL;
</script>

<template>
  <v-fab absolute app :href="baseUrl" icon location="top left">
    <v-icon :icon="mdiHome" />
  </v-fab>
</template>
