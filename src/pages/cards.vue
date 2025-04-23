<script setup lang="ts">
import PointCard from "@/assets/cards/verbs/action2/point.png";
import Point2Card from "@/assets/cards/verbs/action2/point2.png";
import NoCard from "@/assets/no.png";
import YesCard from "@/assets/yes.png";
import tools from "@/types/tools";
import { useCardSet } from "@/utils/cards";
import { useKeys } from "@/utils/keys";
import { calcGridLayout, calcRows, useResize } from "@/utils/resize";
import { mdiRefresh } from "@mdi/js";
import { chunk, sample } from "lodash";
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";

const { cards, cardSet, chooseCards, numCards } = useCardSet(4);

const demonstratives = ref(false);
const shuffleDemonstratives = ref(true);
const chooseDemonstrativeImg = () => sample([PointCard, Point2Card]);
const demonstrativeImg = ref(chooseDemonstrativeImg());
const polarity = ref(false);
const shufflePolarity = ref(true);
const choosePolarityImg = () => sample([NoCard, YesCard]);
const polarityImg = ref(choosePolarityImg());

const container = useTemplateRef("container");
const { cols, handleResize, size } = useResize(
  container,
  numCards,
  (rect, num) =>
    num === 2
      ? calcRows(1, num) // Force one column.
      : num === 4
        ? calcRows(2, num) // Force two columns.
        : calcGridLayout(rect, num),
);

const cardChunks = computed(() => chunk(cards.value, cols.value));
const selectedCard = ref("");
const handleSelected = (value?: string) => {
  if (value) selectedCard.value = value;
};
const handleDeselect = () => (selectedCard.value = "");
const roll = ref(0);

const handleRoll = () => {
  roll.value++;
  chooseCards();
  selectedCard.value = "";
  handleResize();
  if (shuffleDemonstratives.value)
    demonstrativeImg.value = chooseDemonstrativeImg();
  if (shufflePolarity.value) polarityImg.value = choosePolarityImg();
};
watch([cardSet, numCards], handleRoll);
const { onKey } = useKeys();
onKey("Enter", handleRoll);
onKey("Escape", handleDeselect);
onKey(" ", () => {
  numCards.value = numCards.value > 1 ? 1 : cardSet.value.cards.length;
});
onKey("d", () => {
  demonstratives.value = !demonstratives.value;
  if (demonstratives.value && shuffleDemonstratives.value)
    demonstrativeImg.value = chooseDemonstrativeImg();
});
onKey("f", () => {
  demonstratives.value = true;
  demonstrativeImg.value = Point2Card;
});
onKey("m", () => {
  demonstratives.value = true;
  demonstrativeImg.value = PointCard;
});
onKey("n", () => {
  polarity.value = true;
  polarityImg.value = NoCard;
});
onKey("p", () => {
  polarity.value = !polarity.value;
  if (polarity.value && shufflePolarity.value)
    polarityImg.value = choosePolarityImg();
});
onKey("y", () => {
  polarity.value = true;
  polarityImg.value = YesCard;
});
onMounted(handleRoll);
</script>

<template>
  <Tool :tool="tools.cards">
    <template #toolbar>
      <v-btn :icon="mdiRefresh" @click="handleRoll" />
    </template>

    <template #tool-menu>
      <CardSetSelector v-model="cardSet" />
      <div class="control-row">
        <v-tooltip
          text="Show a character to use for demonstratives? Use the `d` key to toggle."
        >
          <template #activator="{ props }">
            <v-switch
              v-model="demonstratives"
              v-bind="props"
              label="Demonstratives"
            />
          </template>
        </v-tooltip>
        <v-switch
          v-model="shuffleDemonstratives"
          :disabled="!demonstratives"
          label="Shuffle"
        />
      </div>
      <div class="control-row">
        <v-tooltip
          text="Show yes/no images for polarity? Use the `p` key to toggle."
        >
          <template #activator="{ props }">
            <v-switch v-model="polarity" v-bind="props" label="Yes/No" />
          </template>
        </v-tooltip>
        <v-switch
          v-model="shufflePolarity"
          :disabled="!polarity"
          label="Shuffle"
        />
      </div>
      <v-slider
        v-model="numCards"
        label="Number of choices"
        :max="cardSet.cards.length"
        min="1"
      />
    </template>

    <div ref="container" class="card-container" @click.prevent="handleDeselect">
      <div class="card-wrapper">
        <div v-for="(row, j) in cardChunks" :key="j" class="card-row">
          <CardTile
            v-for="(card, i) in row"
            :key="`${card.id}-${roll}`"
            action="highlight"
            :hotkey="(j * cols + i + 1).toString()"
            :image="sample(card.images)!"
            :index="j * cols + i"
            :selected="selectedCard === card.id"
            :size="size"
            :value="card.id"
            @selected="handleSelected"
          />
        </div>
        <v-img
          v-if="demonstratives"
          class="card-feature-overlay"
          :src="demonstrativeImg"
          :style="{
            height: `${size / 2}px`,
            left: `-${size / 4}px`,
            top: `${size / 4}px`,
            width: `${size / 2}px`,
          }"
        />
        <v-img
          v-if="polarity"
          class="card-feature-overlay"
          :src="polarityImg"
          :style="{
            bottom: `${size / 4}px`,
            height: `${size / 2}px`,
            right: `-${size / 4}px`,
            width: `${size / 2}px`,
          }"
        />
      </div>
    </div>
  </Tool>
</template>

<style lang="scss" scoped>
.card-container {
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.card-feature-overlay {
  position: absolute;
}

.card-wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
}

.card-row {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
}
</style>
