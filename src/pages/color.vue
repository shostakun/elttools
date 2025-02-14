<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { getColorList } from "@/utils/color";
import { sample } from "lodash";

const duration = 3;
const interval = 0.5;
const countdown = ref(0);
const size = 7;

const colorList = computed(() =>
  getColorList(size * (size + duration / interval)),
);
const color = ref(sample(colorList.value));
const colors = computed(() => {
  const start = ((duration - countdown.value) * size) / interval;
  return colorList.value.slice(start, start + size * size);
});

watch(countdown, (newCount) => {
  if (newCount > 0) {
    setTimeout(() => {
      countdown.value -= interval;
    }, interval * 1000);
  }
});

const handleRefresh = () => {
  countdown.value = duration;
  color.value = sample(colorList.value);
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    handleRefresh();
  }
};

onMounted(() => {
  handleRefresh();
  addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div
    class="color-container"
    @click.prevent="handleRefresh"
    @keydown="handleKeydown"
  >
    <div v-if="countdown > 0" class="animation-container">
      <div
        v-for="(c, i) in colors"
        :key="`${c.label}-${i}`"
        :style="{ backgroundColor: c.value }"
        class="animation-tile"
      ></div>
    </div>
    <div
      v-else
      class="color-result"
      :style="{ backgroundColor: color.value }"
    />
  </div>
</template>

<style scoped>
.animation-container {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
}

.animation-tile {
  height: calc(100vh / v-bind(size));
  position: relative;
  width: calc(100% / v-bind(size));
}

.color-container {
  height: 100%;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.color-result {
  height: 100%;
  position: relative;
  width: 100%;
}
</style>
