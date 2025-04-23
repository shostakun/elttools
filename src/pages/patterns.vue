<script setup lang="ts">
import question from "@/assets/question.svg";
import tools from "@/types/tools";
import { useCardSet } from "@/utils/cards";
import { useKeys } from "@/utils/keys";
import { calcOneRow, calcRows, useResize } from "@/utils/resize";
import { mdiRefresh } from "@mdi/js";
import { chunk, range, sample, startCase } from "lodash";
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";

const { cards, cardSet, chooseCards, numCards } = useCardSet();

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

const wrap = ref(false);
const sizer = useTemplateRef("sizer");
const { cols, handleResize, size } = useResize(
  sizer,
  totalLength,
  (rect: DOMRect, num: number) =>
    wrap.value
      ? calcRows(answerLength.value, totalLength.value)
      : calcOneRow(rect, num),
);
watch(wrap, handleResize);
const indices = computed(() => chunk(range(totalLength.value), cols.value));

const questionNum = ref(0);
const pattern = ref("01");
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
  numCards.value = new Set(newPattern.split("")).size;
  chooseCards();
  handleResize();
};

watch(cardSet, handleChoosePattern);
watch(availablePatterns, () => {
  if (!availablePatterns.value.includes(pattern.value)) handleChoosePattern();
});

const handleAnswered = (value?: number) => {
  if (typeof value === "number" && value >= hintLength.value)
    answered.value.add(value);
};

const { onKey } = useKeys();
onKey("Enter", handleChoosePattern);

onMounted(() => {
  handleChoosePattern();
});

const imageFor = (i: number) =>
  cards.value[parseInt(pattern.value[i % pattern.value.length])]?.images[0] ??
  question;
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
      <v-switch v-model="wrap" label="Wrap pattern" />
    </template>

    <div ref="sizer" class="pattern-sizer">
      <div v-for="(row, j) in indices" :key="j" class="pattern-row">
        <CardTile
          v-for="i in row"
          :key="`${i}-${questionNum}`"
          :action="i >= hintLength || reveal ? undefined : 'showOnHover'"
          density="high"
          :image="i < hintLength || answered.has(i) ? imageFor(i) : question"
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
