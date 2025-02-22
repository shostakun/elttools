import { onMounted, onUnmounted } from "vue";
import { useEmitter } from "./emitter";

export type KeyCallback = (event: KeyboardEvent) => void;

export const ANY_KEY = "any";

export const useKeys = () => {
  const { emit, on, off } = useEmitter<KeyCallback>();

  const handleKeydown = (event: KeyboardEvent) => {
    emit(event.key, event);
    emit(ANY_KEY, event);
  };

  onMounted(() => {
    addEventListener("keydown", handleKeydown);
  });

  onUnmounted(() => {
    removeEventListener("keydown", handleKeydown);
  });

  return {
    offKey: (key: typeof ANY_KEY | string, cb?: KeyCallback) => off(key, cb),
    onKey: (key: typeof ANY_KEY | string, cb: KeyCallback) => on(key, cb),
  };
};
