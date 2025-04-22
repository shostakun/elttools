import { onMounted, onUnmounted, ref, type Ref, type ShallowRef } from "vue";

export const calcGridLayout = (rect: DOMRect, num: number) => {
  const ratio = rect.width / rect.height;

  let c = 1;
  while (c / Math.ceil(num / c) < ratio) {
    c++;
  }
  return calcRows(c, num);
};
type CalcLayout = typeof calcGridLayout;

export const calcOneRowLayout: CalcLayout = (_, num) => ({
  cols: num,
  rows: 1,
});

export const calcRows = (cols: number, num: number) => {
  const rows = Math.ceil(num / cols);
  return { cols: Math.ceil(num / rows), rows };
};

export const useResize = (
  container: Readonly<ShallowRef<HTMLDivElement | null>>,
  n: Ref<number>,
  calcLayout = calcGridLayout,
) => {
  const cols = ref(n.value);
  const size = ref(100);

  const handleResize = () => {
    if (!container.value || n.value < 1) return;
    const rect = container.value.getBoundingClientRect();
    if (!rect) return;
    const layout = calcLayout(rect, n.value);
    cols.value = layout.cols;
    size.value = Math.min(rect.height / layout.rows, rect.width / layout.cols);
  };

  onMounted(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
  });

  return {
    cols,
    handleResize,
    size,
  };
};
