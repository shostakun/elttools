import "@/styles/main.scss";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

const sliderDefaults = {
  class: "slider-with-thumb-label",
  hideDetails: true,
  step: 1,
  thumbLabel: "always",
} as const;

export default createVuetify({
  defaults: {
    VRangeSlider: sliderDefaults,
    VSlider: sliderDefaults,
    VSwitch: {
      color: "primary",
      hideDetails: true,
      inset: true,
    },
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
  },
});
