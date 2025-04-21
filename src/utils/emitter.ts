import { ref } from "vue";

export function useEmitter<T extends (...args: never[]) => unknown>() {
  const handlers = ref<Record<string, Set<T>>>({});

  return {
    emit: (evts: string | string[], ...args: Parameters<T>) => {
      (typeof evts === "string" ? [evts] : evts).forEach((evt) => {
        handlers.value[evt]?.forEach((cb) => cb(...args));
      });
    },
    off: (evts: string | string[], cb?: T) => {
      (typeof evts === "string" ? [evts] : evts).forEach((evt) => {
        if (cb) (handlers.value[evt] ??= new Set()).delete(cb);
        else handlers.value[evt] = new Set();
      });
    },
    on: (evts: string | string[], cb: T) => {
      (typeof evts === "string" ? [evts] : evts).forEach((evt) => {
        (handlers.value[evt] ??= new Set()).add(cb);
      });
    },
  };
}
