<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from "vue";

const props = defineProps<{ running: boolean }>();

const start = ref(0);
const stop = ref(0);
const seconds = ref(0);

const reset = () => {
  start.value = 0;
  stop.value = 0;
  seconds.value = 0;
};
defineExpose({ reset });

const tick = () =>
  (seconds.value = start.value ? Math.floor(((stop.value || Date.now()) - start.value) / 1000) : 0);
const interval = ref<ReturnType<typeof setInterval> | null>(null);

watch(
  () => props.running,
  () => {
    if (props.running && !start.value) {
      // Start the timer if necessary.
      start.value = Date.now();
      interval.value = setInterval(tick);
    } else if (!props.running && start.value && !stop.value) {
      // Stop the timer if necessary.
      stop.value = Date.now();
      if (interval.value) clearInterval(interval.value);
    }
  },
);

onUnmounted(() => {
  if (interval.value) clearInterval(interval.value);
});

const text = computed(
  () =>
    Math.floor(seconds.value / 60) +
    ":" +
    (seconds.value % 60 < 10 ? "0" : "") +
    (seconds.value % 60),
);
</script>

<template>
  <span>{{ text }}</span>
</template>
