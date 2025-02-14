import Vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import Components from "unplugin-vue-components/vite";
import VueRouter from "unplugin-vue-router/vite";
import { defineConfig } from "vite";
import Vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineConfig({
  plugins: [
    VueRouter(),
    Vue({ template: { transformAssetUrls } }),
    Vuetify({
      autoImport: true,
      styles: { configFile: "src/styles/settings.scss" },
    }),
    Components(),
  ],
  base: "./",
  define: { "process.env": {} },
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
    extensions: [".js", ".json", ".jsx", ".mjs", ".ts", ".tsx", ".vue"],
  },
  server: { port: 3000 },
  css: { preprocessorOptions: { sass: { api: "modern-compiler" } } },
});
