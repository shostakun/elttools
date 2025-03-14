<script setup lang="ts">
import { micromark } from "micromark";
import { computed } from "vue";

const { text } = defineProps<{ text: string }>();
const html = computed(() => micromark(text));
</script>

<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div class="markdown" v-html="html" />
</template>

<style lang="scss">
.markdown {
  & p:not(:last-child) {
    margin-bottom: 0.75rem;
  }
}
</style>
