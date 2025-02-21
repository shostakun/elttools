import "@/styles/main.scss";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi-svg";

export default createVuetify({
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
