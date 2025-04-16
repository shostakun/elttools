<script setup lang="ts">
import { useKeys } from "@/utils/keys";
import { ref } from "vue";

const { image, index, size, value } = defineProps<{
  image: string;
  index: number;
  size: string;
  value: number;
}>();

const visible = ref(false);
const handleShowClick = () => {
  visible.value = true;
};

const { onKey } = useKeys();
onKey((index + 1).toString(), handleShowClick);
</script>

<template>
  <div class="dice-cell" :style="{ height: size, width: size }">
    <div class="dice-image"><v-img :src="image" /></div>
    <div
      class="dice-target"
      :style="{ opacity: visible ? 1 : 0 }"
      @mousedown="handleShowClick"
    >
      {{ value }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dice-cell {
  padding: 0.5rem;
  position: relative;
}

.dice-image {
  align-items: center;
  background-color: #88888844;
  border-radius: 0.5rem;
  display: flex;
  height: 100%;
  padding: 1rem;
  position: relative;
  width: 100%;
}

.dice-target {
  align-items: center;
  display: flex;
  font-size: 8rem;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  -webkit-text-stroke: 3px rgb(var(--v-theme-background));
  top: 0;
  width: 100%;
}
</style>
