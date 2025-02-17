<script setup lang="ts">
import { type Tool } from "@/types";
const { tool } = defineProps<{ tool: Tool }>();
</script>

<template>
  <v-card :to="tool.url">
    <div class="d-flex flex-no-wrap">
      <v-responsive :aspect-ratio="16 / 9" class="flex-0-0" width="240px">
        <v-img :src="tool.thumbnail" />
      </v-responsive>
      <div>
        <v-card-title>{{ tool.title }}</v-card-title>
        <v-card-text>{{ tool.description }}</v-card-text>
      </div>
    </div>
  </v-card>
</template>
