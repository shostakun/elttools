import { merge } from "lodash";
import { computed, ref, watch } from "vue";
import { useEmitter } from "./emitter";

interface CountdownOptions {
  duration: number;
  interval: number;
}

type CountdownCallback = (current: number) => void;

export const useCountdown = (options: Partial<CountdownOptions> = {}) => {
  const { emit, on, off } = useEmitter<CountdownCallback>();

  const opts = ref(
    merge(
      {
        duration: 3,
        interval: 0.5,
      },
      options,
    ) as CountdownOptions,
  );
  const { duration, interval } = opts.value;

  const countdown = ref(0);

  const startCountdown = () => {
    countdown.value = duration;
    emit("start", duration);
  };

  watch(countdown, (newCount) => {
    const ongoing = newCount > 0;
    if (ongoing) {
      setTimeout(() => {
        countdown.value = Math.max(countdown.value - interval, 0);
      }, interval * 1000);
    }
    emit(ongoing ? "tick" : "end", newCount);
  });

  const countdownRunning = computed(() => countdown.value > 0);

  const countdownStepsElapsed = computed(() =>
    Math.ceil((duration - countdown.value) / interval),
  );

  const countdownStepsRemaining = computed(() =>
    Math.ceil(countdown.value / interval),
  );

  return {
    countdownRunning,
    countdownSteps: Math.ceil(duration / interval),
    countdownStepsElapsed,
    countdownStepsRemaining,
    offCountdownEnd: (cb: CountdownCallback) => off("end", cb),
    offCountdownStart: (cb: CountdownCallback) => off("start", cb),
    offCountdownTick: (cb: CountdownCallback) => off("tick", cb),
    onCountdownEnd: (cb: CountdownCallback) => on("end", cb),
    onCountdownStart: (cb: CountdownCallback) => on("start", cb),
    onCountdownTick: (cb: CountdownCallback) => on("tick", cb),
    startCountdown,
  };
};
