<script setup lang="ts">
import question from "@/assets/question.svg";
import { defaultSet } from "@/assets/cards";
import type { Card, CardSet } from "@/types/cards";
import tools from "@/types/tools";
import { useKeys } from "@/utils/keys";
import { calcOneRowLayout, useResize } from "@/utils/resize";
import { mdiRefresh } from "@mdi/js";
import { sample, sampleSize, startCase } from "lodash";
import { computed, onMounted, ref, useTemplateRef, watch, type Ref } from "vue";

const cardSet: Ref<CardSet> = ref(defaultSet);

const patterns = {
  easy: ["01", "012"],
  medium: ["001", "010", "011"],
  hard: ["0011", "0112", "0102", "0122", "0120"],
};

const allDifficulties = Object.keys(patterns);
const difficultyOptions = computed(() =>
  allDifficulties.map((key) => ({
    title: startCase(key),
    value: key,
  })),
);
const selectedDifficulties = ref(allDifficulties);
const allSelected = computed(
  () => selectedDifficulties.value.length === difficultyOptions.value.length,
);
const handleSelectAll = () => (selectedDifficulties.value = allDifficulties);
const availablePatterns = computed(() =>
  selectedDifficulties.value
    .map((key) => patterns[key as keyof typeof patterns])
    .flat(),
);

const hintLength = ref(6);
const answerLength = ref(2);
const totalLength = computed(() => hintLength.value + answerLength.value);

const sizer = useTemplateRef("sizer");
const { handleResize, size } = useResize(sizer, totalLength, calcOneRowLayout);

const questionNum = ref(0);
const pattern = ref("01");
const cards: Ref<Card[]> = ref(sampleSize(cardSet.value.cards, 2) as Card[]);
const answered = ref<Set<number>>(new Set());
const reveal = computed(() => answered.value.size >= answerLength.value);
const handleChoosePattern = () => {
  const newPattern = sample(availablePatterns.value);
  if (!newPattern) return;
  questionNum.value++;
  answered.value = new Set();
  pattern.value = newPattern;
  answerLength.value = newPattern.length;
  hintLength.value = Math.min(newPattern.length * 3, 12 - answerLength.value);
  const n = new Set(newPattern.split("")).size;
  cards.value = sampleSize(cardSet.value.cards, n);
  handleResize();
};

watch(cardSet, handleChoosePattern);
watch(availablePatterns, () => {
  if (!availablePatterns.value.includes(pattern.value)) handleChoosePattern();
});

const handleAnswered = (value?: number) => {
  if (typeof value === "number" && value > hintLength.value)
    answered.value.add(value);
};

const { onKey } = useKeys();
onKey("Enter", handleChoosePattern);

onMounted(() => {
  handleChoosePattern();
});

const imageFor = (i: number) =>
  cards.value[parseInt(pattern.value[i % pattern.value.length])].images[0];
</script>

<template>
  <Tool container-class="pattern-container" :tool="tools.patterns">
    <template #toolbar>
      <v-btn :icon="mdiRefresh" @click="handleChoosePattern" />
    </template>

    <template #tool-menu>
      <CardSetSelector v-model="cardSet" />
      <v-select
        v-model="selectedDifficulties"
        :items="difficultyOptions"
        label="Difficulty"
        multiple
      >
        <template #prepend-item>
          <v-list-item title="Select All" @click="handleSelectAll">
            <template #prepend>
              <v-checkbox-btn
                :indeterminate="!!selectedDifficulties.length && !allSelected"
                :model-value="allSelected"
              />
            </template>
          </v-list-item>

          <v-divider class="mt-2"></v-divider>
        </template>
      </v-select>
    </template>

    <div ref="sizer" class="pattern-sizer">
      <div class="pattern-row">
        <CardTile
          v-for="i in totalLength"
          :key="`${i}-${questionNum}`"
          :action="i > hintLength || reveal ? undefined : 'showOnHover'"
          density="high"
          :image="i <= hintLength || answered.has(i) ? imageFor(i) : question"
          :size="size"
          :value="i"
          @selected="handleAnswered"
        />
      </div>
    </div>
  </Tool>
</template>

<style lang="scss">
.pattern-container {
  align-items: center;
  display: flex;
}

.pattern-row {
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  overflow: hidden;
}

.pattern-sizer {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
}
</style>
