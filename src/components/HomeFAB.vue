<script setup lang="ts">
import { mdiHome } from "@mdi/js";
</script>

<template>
  <v-fab absolute app to="/" icon location="top left">
    <v-icon :icon="mdiHome" />
  </v-fab>
</template>
