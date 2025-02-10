import { createRouter, createWebHistory } from "vue-router";

import RandomColor from "./components/RandomColor.vue";
import ToolList from "./components/ToolList.vue";

const routes = [
  { path: "/", component: ToolList },
  { path: "/color", component: RandomColor },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  routes,
});

export default router;
