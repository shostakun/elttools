<script lang="ts" setup>
import tools from "@/types/tools";
import { useCountdown } from "@/utils/countdown";
import { useKeys } from "@/utils/keys";
import classNames from "classnames";
import { clamp, random } from "lodash";
import { computed, onMounted, ref, watch } from "vue";

const magnitude = ref(2);
const negative = ref(false);
const rangeRange = computed(() => {
  const upper = 10 ** magnitude.value;
  const lower = negative.value ? -upper : 0;
  return { lower, upper };
});
const range = ref<[number, number]>([1, 10 ** magnitude.value]);
const answer = ref(0);

const chooseAnswer = () => {
  const [lower, upper] = range.value
    .map(Math.round)
    .map((n) => clamp(n, rangeRange.value.lower, rangeRange.value.upper));
  answer.value = random(lower, upper);
};

watch(magnitude, (newMag, oldMag) => {
  const ratio = 10 ** newMag / 10 ** oldMag;
  const [lower, upper] = range.value;
  // Don't round here so we don't loose precision; round when actually choosing numbers.
  range.value = [lower >= 0 ? lower : lower * ratio, upper * ratio];
});

const { countdownRunning, onCountdownTick, startCountdown } = useCountdown({
  interval: 0.1,
});

onCountdownTick(chooseAnswer);
const answerClass = computed(() =>
  classNames("rand-answer", { "rand-animation": countdownRunning.value }),
);

const handleRefresh = startCountdown;

const { onKey } = useKeys();
onKey("Enter", handleRefresh);

onMounted(() => {
  handleRefresh();
});
</script>

<template>
  <Tool :tool="tools.randomNumber">
    <template #tool-menu>
      <v-range-slider
        v-model="range"
        label="Range"
        :max="rangeRange.upper"
        :min="rangeRange.lower"
      />
      <v-slider v-model="magnitude" label="Magnitude" max="10" min="1" />
      <v-checkbox v-model="negative" density="compact" label="Negative" />
    </template>

    <div class="rand-container" @click.prevent="handleRefresh">
      <div :class="answerClass">{{ answer }}</div>
    </div>
  </Tool>
</template>

<style scoped lang="scss">
.rand-container {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.rand-answer {
  font-size: 33vh;

  &.rand-animation {
    filter: blur(10px);
    font-size: 25vh;
    opacity: 0.3;
  }
}
</style>
