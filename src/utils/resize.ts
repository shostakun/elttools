import { onMounted, onUnmounted } from "vue";

export const useResize = (callback: () => void) => {
  onMounted(() => {
    callback();
    window.addEventListener("resize", callback);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", callback);
  });
};
