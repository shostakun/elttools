<script setup lang="ts">
import question from "@/assets/question.svg";
import { ref } from "vue";

const { answer, image, reveal } = defineProps<{
  answer: boolean;
  image: string;
  reveal: boolean;
}>();
const emit = defineEmits<{ answered: [] }>();

const visible = ref(false);
const handleHide = () => (visible.value &&= answer);
const handleShowClick = () => {
  if (!visible.value && answer) emit("answered");
  visible.value = true;
};
const handleShowHover = () => (visible.value ||= !answer);
</script>

<template>
  <v-responsive :aspect-ratio="1 / 1" class="pattern-cell">
    <v-img v-if="answer && !reveal && !visible" :src="question" />
    <v-img
      v-else
      :src="image"
      :style="{ opacity: reveal || visible ? 1 : 0 }"
    />
    <div
      class="pattern-target"
      @mouseenter="handleShowHover"
      @mousedown="handleShowClick"
      @mouseleave="handleHide"
      @mouseup="handleHide"
    />
  </v-responsive>
</template>

<style lang="scss" scoped>
.pattern-cell {
  align-items: center;
  background-color: #88888844;
  border-radius: 0.5rem;
  display: flex;
  flex: 1 1 auto;
  padding: 0.5rem;
  position: relative;
}

.pattern-target {
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
