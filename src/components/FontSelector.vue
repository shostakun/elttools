<script setup lang="ts">
import { DEFAULT_FONT, fontOptions } from "@/types/font";

const selectedFont = defineModel<string>({
  default: DEFAULT_FONT,
});
</script>

<template>
  <v-select v-model="selectedFont" :items="fontOptions" label="Font"
    ><template #item="{ props: itemProps, item }">
      <v-list-item
        v-bind="itemProps"
        :style="{ fontFamily: item.value }"
      ></v-list-item> </template
  ></v-select>
</template>
