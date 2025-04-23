<script setup lang="ts">
import { defaultSet, sets } from "@/assets/cards";
import { provide, ref } from "vue";

const allSets = ref(Object.values(sets));

provide("allSets", allSets);
provide("defaultSet", defaultSet);
</script>

<template>
  <slot />
</template>
