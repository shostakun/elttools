<script setup lang="ts">
import { type Tool } from "@/types";
import { useDarkMode } from "@/utils/darkMode";
import { computed } from "vue";

const { darkMode } = useDarkMode();

const { tool } = defineProps<{ tool: Tool }>();
const thumbnail = computed(() =>
  darkMode.value && tool.thumbnailDark ? tool.thumbnailDark : tool.thumbnail,
);
</script>

<template>
  <v-card :to="tool.url">
    <div class="d-flex flex-no-wrap">
      <v-responsive :aspect-ratio="16 / 9" class="flex-0-0" width="240px">
        <v-img :src="thumbnail" />
      </v-responsive>
      <div class="card-text">
        <v-card-title>{{ tool.title }}</v-card-title>
        <v-card-text>
          <Markdown :text="tool.description" />
        </v-card-text>
      </div>
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.card-text {
  display: flex;
  flex-direction: column;
  max-height: 135px;

  & > :not(:first-child) {
    flex: 1 1 auto;
  }
}
</style>
