<script setup lang="ts">
import { defaultSet } from "@/assets/cards";
import type { Card, CardSet } from "@/types/cards";
import tools from "@/types/tools";
import { sample, sampleSize, startCase } from "lodash";
import { computed, onMounted, onUnmounted, ref, watch, type Ref } from "vue";
import { mdiRefresh } from "@mdi/js";

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

const questionNum = ref(0);
const pattern = ref("01");
const cards: Ref<Card[]> = ref(sampleSize(cardSet.value.cards, 2) as Card[]);
const hintLength = ref(6);
const answerLength = ref(2);
const answered = ref(0);
const reveal = ref(false);
const handleChoosePattern = () => {
  const newPattern = sample(availablePatterns.value);
  if (!newPattern) return;
  reveal.value = false;
  questionNum.value++;
  answered.value = 0;
  pattern.value = newPattern;
  answerLength.value = newPattern.length;
  hintLength.value = Math.min(newPattern.length * 3, 12 - answerLength.value);
  const n = new Set(newPattern.split("")).size;
  cards.value = sampleSize(cardSet.value.cards, n);
};

watch(cardSet, handleChoosePattern);
watch(availablePatterns, () => {
  if (!availablePatterns.value.includes(pattern.value)) handleChoosePattern();
});

const handleAnswered = () => {
  answered.value++;
  if (answered.value >= answerLength.value) reveal.value = true;
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    handleChoosePattern();
  }
};

onMounted(() => {
  handleChoosePattern();
  addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  removeEventListener("keydown", handleKeydown);
});

const imageFor = (i: number) =>
  cards.value[parseInt(pattern.value[i % pattern.value.length])].images[0];
</script>

<template>
  <HomeFAB />
  <v-fab
    v-if="reveal"
    absolute
    app
    icon
    location="top center"
    @click="handleChoosePattern"
  >
    <v-icon :icon="mdiRefresh" />
  </v-fab>
  <ToolMenu :tool="tools.patterns">
    <CardSetSelector v-model="cardSet" />
    <v-select
      v-model="selectedDifficulties"
      :items="difficultyOptions"
      label="Difficulty"
      multiple
      variant="solo"
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
  </ToolMenu>
  <div class="pattern-container">
    <div class="pattern">
      <PatternCell
        v-for="i in hintLength + answerLength"
        :key="`${i}-${questionNum}`"
        :image="imageFor(i)"
        :answer="i > hintLength"
        :reveal="reveal"
        @answered="handleAnswered"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pattern-container {
  align-items: center;
  display: flex;
  height: 100%;
  position: relative;
  width: 100%;
}

.pattern {
  align-items: stretch;
  display: flex;
  gap: 0.5rem;
  margin: 1rem;
  position: relative;
  width: 100%;
}
</style>
