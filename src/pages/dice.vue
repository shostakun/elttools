<script setup lang="ts">
import tools from "@/types/tools";
import { useCardSets } from "@/utils/cards";
import { useKeys } from "@/utils/keys";
import { useResize } from "@/utils/resize";
import { mdiRefresh } from "@mdi/js";
import { chunk, shuffle } from "lodash";
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";

const { cards, cardSets, cardsInSets, chooseCards, numCards } = useCardSets(6);

const container = useTemplateRef("container");
const { cols, handleResize, size } = useResize(container, numCards);

const chooseValues = () =>
  shuffle(
    Array(numCards.value)
      .fill(0)
      .map((_, i) => i + 1),
  );
const cardChunks = computed(() => chunk(cards.value, cols.value));
const chosenValues = ref(chooseValues());
const values = computed(() => chunk(chosenValues.value, cols.value));

const selectedCard = ref("");
const handleSelected = (value?: string) => {
  if (value) selectedCard.value = value;
};
const handleDeselect = () => (selectedCard.value = "");

const handleRoll = () => {
  handleDeselect();
  chooseCards();
  chosenValues.value = chooseValues();
  handleResize();
};
watch([cardSets, numCards], handleRoll);
const { onKey } = useKeys();
onKey("Enter", handleRoll);
onMounted(handleRoll);
</script>

<template>
  <Tool :tool="tools.dice">
    <template #toolbar>
      <v-btn :icon="mdiRefresh" @click="handleRoll" />
    </template>

    <template #tool-menu>
      <CardSetSelector v-model="cardSets" />
      <v-slider
        v-model="numCards"
        label="Number of choices"
        :max="cardsInSets.length"
        min="2"
      />
    </template>

    <div ref="container" class="dice-container">
      <div class="dice">
        <div v-for="(row, j) in cardChunks" :key="j" class="dice-row">
          <CardTile
            v-for="(card, i) in row"
            :key="card.id"
            action="overlay"
            :hotkey="(j * cols + i).toString()"
            :image="card.images[0]"
            :selected="selectedCard === card.id"
            :size="size"
            :value="card.id"
            @selected="handleSelected"
          >
            <template #overlay>
              <span class="dice-overlay">{{ values[j][i] }}</span>
            </template>
          </CardTile>
        </div>
      </div>
    </div>
  </Tool>
</template>

<style lang="scss" scoped>
.dice-container {
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.dice {
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
}

.dice-overlay {
  font-size: 8rem;
  -webkit-text-stroke: 3px rgb(var(--v-theme-background));
}

.dice-row {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
}
</style>
