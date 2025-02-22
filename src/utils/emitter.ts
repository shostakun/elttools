import { ref } from "vue";

export function useEmitter<T extends (...args: never[]) => unknown>() {
  const handlers = ref<Record<string, Set<T>>>({});

  return {
    emit: (evt: string, ...args: Parameters<T>) => {
      handlers.value[evt]?.forEach((cb) => cb(...args));
    },
    off: (evt: string, cb?: T) => {
      if (cb) (handlers.value[evt] ??= new Set()).delete(cb);
      else handlers.value[evt] = new Set();
    },
    on: (evt: string, cb: T) => {
      (handlers.value[evt] ??= new Set()).add(cb);
    },
  };
}
