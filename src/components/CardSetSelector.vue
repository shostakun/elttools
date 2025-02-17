<script setup lang="ts">
import { defaultSet, sets } from "@/assets/cards";
import type { CardSet } from "@/types/cards";
import { sortBy } from "lodash";
import { computed } from "vue";

const selectedCardSet = defineModel<CardSet>({ default: defaultSet });

const cardSetOptions = computed(() => sortBy(Object.values(sets), ["label"]));
</script>

<template>
  <v-select
    v-model="selectedCardSet"
    :items="cardSetOptions"
    item-title="label"
    item-value="id"
    label="Card set"
    return-object
    variant="solo"
  />
</template>
