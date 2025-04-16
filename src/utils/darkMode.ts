import { inject, type Ref } from "vue";

const DARK_MODE_STORAGE_KEY = "__elttools_dark_mode";

export const isDarkMode = (fallback: boolean) => {
  const storedValue = localStorage.getItem(DARK_MODE_STORAGE_KEY);
  if (!storedValue) return fallback;
  return storedValue === "true";
};

export const storeDarkMode = (darkMode: boolean) => {
  localStorage.setItem(DARK_MODE_STORAGE_KEY, darkMode ? "true" : "false");
};

export const useDarkMode = () => {
  const darkMode = inject<Ref<boolean>>("darkMode") ?? { value: false };
  const store = () => storeDarkMode(!!darkMode?.value);
  return { darkMode, storeDarkMode: store };
};
