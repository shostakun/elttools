<script setup lang="ts">
import { sets } from "@/assets/cards";
import { flattenSetList, type Card, type CardSet } from "@/types/cards";
import tools from "@/types/tools";
import { useCountdown } from "@/utils/countdown";
import { useKeys } from "@/utils/keys";
import { clamp, sampleSize, shuffle } from "lodash";
import { computed, onMounted, ref, watch, type Ref } from "vue";

const answers = ref<Card[]>([]);
const boardA = ref<Card[]>([]);
const boardB = ref<Card[]>([]);
const boardSizeModel = ref(4);
const cardSets: Ref<CardSet[]> = ref(Object.values(sets));
const findSame = ref(true);
const guess = ref<Card | null>(null);
const images = computed(() => flattenSetList(cardSets.value));
const maxBoardSize = computed(() => {
  console.log("max recalculated", images.value);
  return Math.floor(Math.sqrt((images.value.length + 1) / 2));
});
const minBoardSize = 2;
const boardSize = computed(() =>
  clamp(boardSizeModel.value, minBoardSize, maxBoardSize.value),
);
const enoughCards = computed(() => maxBoardSize.value >= minBoardSize);
console.log("images", images.value.length, maxBoardSize.value);

const handleMakeBoard = () => {
  const boardCount = boardSize.value ** 2;
  const nImages = boardCount * 2 - 1;
  const samples = sampleSize(images.value, nImages);
  if (samples.length < nImages) return;
  guess.value = null;
  answers.value = [samples.pop() as Card];
  if (!findSame.value) answers.value.push(samples.pop() as Card);
  boardA.value = shuffle([
    answers.value[0],
    ...samples.slice(0, boardCount - 1),
  ]);
  boardB.value = shuffle([
    answers.value[answers.value.length - 1],
    ...samples.slice(
      ...(findSame.value ? [boardCount - 1] : [0, boardCount - 1]),
    ),
  ]);
};

watch([boardSize, cardSets, findSame], handleMakeBoard);

const { onKey } = useKeys();
onKey("Enter", handleMakeBoard);

const {
  countdownRunning,
  countdownStepsRemaining,
  onCountdownEnd,
  startCountdown,
} = useCountdown({
  duration: 3,
  interval: 1,
});

const handleAnswer = (card: Card) => {
  if (countdownRunning.value) return;
  guess.value = card;
  startCountdown();
};

onMounted(() => {
  handleMakeBoard();
  onCountdownEnd(handleMakeBoard);
});
</script>

<template>
  <HomeFAB />
  <ToolMenu :tool="tools.same">
    <CardSetSelector v-model="cardSets" />
    <v-slider
      v-model="boardSizeModel"
      label="Board size"
      :max="maxBoardSize"
      :min="minBoardSize"
    />
    <v-switch v-model="findSame" label="Find same" />
  </ToolMenu>

  <div class="same-page">
    <div>
      <h1 v-if="countdownRunning">
        New board in {{ countdownStepsRemaining }}...
      </h1>
      <h1 v-else>Find the {{ findSame ? "same" : "different" }} picture!</h1>
      <h2 v-if="!enoughCards">Not enough cards, please choose more...</h2>
    </div>
    <div
      v-if="enoughCards && answers.length && boardA.length && boardB.length"
      class="board-container"
    >
      <table>
        <tr v-for="row in boardSize" :key="row">
          <SameImageCell
            v-for="col in boardSize"
            :key="col"
            :answers="answers"
            :card="boardA[(row - 1) * boardSize + col - 1]"
            :guess="guess"
            @answered="handleAnswer"
          />
        </tr>
      </table>
      <table>
        <tr v-for="row in boardSize" :key="row">
          <SameImageCell
            v-for="col in boardSize"
            :key="col"
            :answers="answers"
            :card="boardB[(row - 1) * boardSize + col - 1]"
            :guess="guess"
            @answered="handleAnswer"
          />
        </tr>
      </table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.board-container {
  align-items: center;
  display: flex;
  gap: 5rem;
  justify-content: center;
  position: relative;
  width: 100%;

  & td {
    text-align: center;
    vertical-align: middle;
  }
}

.same-page {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
}
</style>
