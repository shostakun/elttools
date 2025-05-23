<script setup lang="ts">
import { type Card } from "@/types/cards";
import tools from "@/types/tools";
import { useCardSets } from "@/utils/cards";
import { useCountdown } from "@/utils/countdown";
import { useKeys } from "@/utils/keys";
import { clamp, shuffle } from "lodash";
import { computed, onMounted, ref, watch } from "vue";

const { allSets, cardSets, cardsInSets, chooseCards, numCards } = useCardSets();

const answers = ref<Card[]>([]);
const boardA = ref<Card[]>([]);
const boardB = ref<Card[]>([]);
const boardSizeModel = ref(4);
const autoRefresh = ref(true);
const findSame = ref(true);
const guess = ref<Card | null>(null);
const maxBoardSize = computed(() => Math.floor(Math.sqrt((cardsInSets.value.length + 1) / 2)));
const minBoardSize = 2;
const boardSize = computed(() => clamp(boardSizeModel.value, minBoardSize, maxBoardSize.value));
const enoughCards = computed(() => maxBoardSize.value >= minBoardSize);

const handleMakeBoard = () => {
  const boardCount = boardSize.value ** 2;
  numCards.value = boardCount * 2 - 1;
  const samples = chooseCards();
  if (samples.length < numCards.value) return;
  guess.value = null;
  answers.value = [samples.pop() as Card];
  if (!findSame.value) answers.value.push(samples.pop() as Card);
  boardA.value = shuffle([answers.value[0], ...samples.slice(0, boardCount - 1)]);
  boardB.value = shuffle([
    answers.value[answers.value.length - 1],
    ...samples.slice(...(findSame.value ? [boardCount - 1] : [0, boardCount - 1])),
  ]);
};

watch([boardSize, cardSets, findSame], handleMakeBoard);

const { onKey } = useKeys();
onKey("Enter", handleMakeBoard);
onKey("r", () => (autoRefresh.value = !autoRefresh.value));

const { countdownRunning, countdownStepsRemaining, onCountdownEnd, startCountdown } = useCountdown({
  duration: 3,
  interval: 1,
});

const handleAnswer = (card: Card) => {
  if (countdownRunning.value || guess.value) return;
  guess.value = card;
  if (autoRefresh.value) startCountdown();
};

onMounted(() => {
  // By default, only include nouns that don't have backgrounds.
  cardSets.value = Object.values(allSets.value).filter(
    (set) => set.tags.includes("noun") && !set.tags.includes("background"),
  );
  handleMakeBoard();
  onCountdownEnd(handleMakeBoard);
});
</script>

<template>
  <Tool container-class="same-container" :tool="tools.same">
    <template #toolbar>
      <NewButton @click="handleMakeBoard" />
    </template>

    <template #tool-menu>
      <CardSetSelector v-model="cardSets" />
      <v-slider
        v-model="boardSizeModel"
        label="Board size"
        :max="maxBoardSize"
        :min="minBoardSize"
      />
      <v-tooltip text="Generate a new board after answering? Use the `r` key to toggle.">
        <template #activator="{ props }">
          <v-switch v-model="autoRefresh" v-bind="props" label="Automatically refresh" />
        </template>
      </v-tooltip>
      <v-switch v-model="findSame" label="Find same" />
    </template>

    <div>
      <h1 v-if="countdownRunning">New board in {{ countdownStepsRemaining }}...</h1>
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
      <v-divider inset thickness="3" vertical />
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
  </Tool>
</template>

<style lang="scss">
.board-container {
  align-items: center;
  display: flex;
  gap: 3rem;
  justify-content: center;
  position: relative;
  width: 100%;

  & td {
    text-align: center;
    vertical-align: middle;
  }
}

.same-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: center;
}
</style>
