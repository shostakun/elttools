<script setup lang="ts">
import type { User } from "@/types";
import { provide, ref } from "vue";

const user = ref<User | null>(null);

provide("user", user);
</script>

<template>
  <slot />
</template>
