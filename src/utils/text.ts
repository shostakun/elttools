import { DEFAULT_FONT } from "@/types/font";

let measurementCanvas: HTMLCanvasElement | null;
export const calcTextWidth = (text: string, font: string | HTMLElement) => {
  measurementCanvas ??= document.createElement("canvas");
  const context = measurementCanvas.getContext("2d");
  if (!context) return 0;
  context.font = typeof font === "string" ? font : getCanvasFont(font);
  const metrics = context.measureText(text);
  return metrics.width;
};

export const getCssStyle = (element: HTMLElement, prop: string) =>
  window.getComputedStyle(element, null).getPropertyValue(prop);

export const getCanvasFont = (element: HTMLElement = document.body) => {
  const weight = getCssStyle(element, "font-weight") || "normal";
  const size = getCssStyle(element, "font-size") || "64px";
  const family = getCssStyle(element, "font-family") || DEFAULT_FONT;
  return `${weight} ${size} "${family}"`;
};
