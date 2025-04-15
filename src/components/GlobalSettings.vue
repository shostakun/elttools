<script setup lang="ts">
import { useDarkMode } from "@/utils/darkMode";
import { onMounted, ref, watch } from "vue";

const { darkMode, storeDarkMode } = useDarkMode();

const handleToggle = () => {
  storeDarkMode();
};

const fontOptions = [
  { title: "Atkinson", value: '"Atkinson Hyperlegible Mono"' },
  { title: "Alata" },
  { title: "OpenDyslexic" },
].map((obj) => ({ value: `"${obj.title}"`, ...obj }));

const selectedFont = ref("Alata");

watch(selectedFont, () =>
  document.documentElement.style.setProperty(
    "--v-font-family",
    selectedFont.value,
  ),
);

onMounted(() => {
  const rootStyles = getComputedStyle(document.documentElement);
  const font = rootStyles.getPropertyValue("--v-font-family").trim();
  if (fontOptions.find(({ value }) => value === font)) {
    selectedFont.value = font;
  }
});
</script>

<template>
  <v-switch
    v-model="darkMode"
    label="Dark mode"
    @update:model-value="handleToggle"
  />
  <v-select v-model="selectedFont" :items="fontOptions" label="Font"
    ><template #item="{ props: itemProps, item }">
      <v-list-item
        v-bind="itemProps"
        :style="{ fontFamily: item.value }"
      ></v-list-item> </template
  ></v-select>
</template>
