<script setup lang="ts">
import { defaultSet, sets } from "@/assets/cards";
import type { CardSet } from "@/types/cards";
import { sortBy } from "lodash";
import { computed } from "vue";

const selectedCardSet = defineModel<CardSet | CardSet[]>({
  default: defaultSet,
});

const multiple = computed(() => selectedCardSet.value instanceof Array);
const allSets = computed(() => Object.values(sets));
const cardSetOptions = computed(() => sortBy(allSets.value, ["label"]));
const allSelected = computed(
  () =>
    multiple.value &&
    (selectedCardSet.value as CardSet[]).length === cardSetOptions.value.length,
);

const handleSelectAll = () => (selectedCardSet.value = allSets.value);
</script>

<template>
  <v-select
    v-model="selectedCardSet"
    :items="cardSetOptions"
    item-title="label"
    item-value="id"
    label="Card set"
    :multiple="multiple"
    return-object
  >
    <template v-if="multiple" #prepend-item>
      <v-list-item title="Select All" @click="handleSelectAll">
        <template #prepend>
          <v-checkbox-btn
            :indeterminate="
              !!(selectedCardSet as CardSet[]).length && !allSelected
            "
            :model-value="allSelected"
          />
        </template>
      </v-list-item>

      <v-divider class="mt-2"></v-divider>
    </template>

    <template v-if="multiple" #selection="{ item, index }">
      <span v-if="index < 1">{{ item.title }}</span>
      <span v-if="index === 1" class="text-grey text-caption align-self-center">
        (+{{ (selectedCardSet as CardSet[]).length - 1 }} others)
      </span>
    </template>
  </v-select>
</template>
