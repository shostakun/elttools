import { onMounted, onUnmounted, ref, watch } from "vue";
import { useTheme } from "vuetify";

const DARK_MODE_STORAGE_KEY = "__elttools_dark_mode";

const isDarkMode = (fallback: boolean) => {
  const storedValue = localStorage.getItem(DARK_MODE_STORAGE_KEY);
  if (!storedValue) return fallback;
  return storedValue === "true";
};

export const useDarkMode = () => {
  const theme = useTheme();
  const darkMode = ref(isDarkMode(theme.global.current.value.dark));

  const handleDarkPreferenceChange = (event: MediaQueryListEvent) => {
    darkMode.value = isDarkMode(event.matches);
  };

  watch(
    darkMode,
    () => (theme.global.name.value = darkMode.value ? "dark" : "light"),
    { immediate: true },
  );

  const darkPreferenceMatch = window.matchMedia("(prefers-color-scheme: dark)");

  onMounted(() =>
    darkPreferenceMatch.addEventListener("change", handleDarkPreferenceChange),
  );

  onUnmounted(() =>
    darkPreferenceMatch.removeEventListener(
      "change",
      handleDarkPreferenceChange,
    ),
  );

  const storeDarkMode = () => {
    localStorage.setItem(
      DARK_MODE_STORAGE_KEY,
      darkMode.value ? "true" : "false",
    );
  };

  return { darkMode, storeDarkMode };
};
