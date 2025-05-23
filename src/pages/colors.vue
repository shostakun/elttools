<script lang="ts" setup>
import tools from "@/types/tools";
import { colors as colorMap, getColorList } from "@/utils/color";
import { useCountdown } from "@/utils/countdown";
import { ANY_KEY, useKeys } from "@/utils/keys";
import { sample, sortBy } from "lodash";
import { computed, onMounted, ref } from "vue";

const size = 7;

const colorOptions = computed(() => sortBy(Object.values(colorMap), ["label"]));
const selectedColors = ref(colorOptions.value.map((c) => c.key));
const allSelected = computed(() => selectedColors.value.length === colorOptions.value.length);

const handleSelectAll = () =>
  (selectedColors.value = allSelected.value ? [] : colorOptions.value.map((c) => c.key));

const { countdownSteps, countdownStepsElapsed, countdownRunning, startCountdown } = useCountdown();

const colorList = computed(() =>
  getColorList(size * (size + countdownSteps), selectedColors.value),
);
const color = ref(sample(colorList.value));
const colors = computed(() => {
  const start = countdownStepsElapsed.value * size;
  return colorList.value.slice(start, start + size * size);
});

const handleRefresh = () => {
  startCountdown();
  color.value = sample(colorList.value);
};

const { onKey } = useKeys();
onKey("Enter", handleRefresh);
onKey(ANY_KEY, (event: KeyboardEvent) => {
  if (colorMap.hasOwnProperty(event.key)) {
    startCountdown();
    color.value = colorMap[event.key as keyof typeof colorMap];
  }
});

onMounted(() => {
  handleRefresh();
});
</script>

<template>
  <Tool container-class="overflow-hidden" :tool="tools.randomColor">
    <template #tool-menu>
      <v-select
        v-model="selectedColors"
        :items="colorOptions"
        item-title="label"
        item-value="key"
        label="Colors"
        multiple
      >
        <template #prepend-item>
          <v-list-item title="Select All" @click="handleSelectAll">
            <template #prepend>
              <v-checkbox-btn
                :indeterminate="!!selectedColors.length && !allSelected"
                :model-value="allSelected"
              />
            </template>
          </v-list-item>

          <v-divider class="mt-2"></v-divider>
        </template>
      </v-select>
    </template>

    <div v-if="countdownRunning" class="animation-container">
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
      @click.prevent="handleRefresh"
    />
  </Tool>
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

.color-result {
  height: 100%;
  position: relative;
  width: 100%;
}
</style>
