<script setup lang="ts">
import { defaultSet } from "@/assets/cards";
import { CardTileAction, flattenSetList } from "@/types/cards";
import tools from "@/types/tools";
import { useKeys } from "@/utils/keys";
import { useResize } from "@/utils/resize";
import { mdiRefresh } from "@mdi/js";
import { chunk, shuffle } from "lodash";
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";

const n = ref(6);
const cols = ref(n.value);

const container = useTemplateRef("container");
const size = ref(100);
const handleResize = () => {
  const rect = container.value?.getBoundingClientRect();
  const ratio = rect ? rect.width / rect.height : 4 / 3;

  let c = 1;
  while (c / Math.ceil(n.value / c) < ratio) {
    c++;
  }
  const r = Math.ceil(n.value / c);
  c = Math.ceil(n.value / r);
  cols.value = c;

  if (container.value) {
    size.value = Math.min(
      container.value.clientHeight / r,
      container.value.clientWidth / c,
    );
  }
};
useResize(handleResize);

const cardSets = ref([defaultSet]);
const allCards = computed(() => flattenSetList(cardSets.value));
const chooseCards = () => shuffle(allCards.value).slice(0, n.value);
const chooseValues = () =>
  shuffle(
    Array(n.value)
      .fill(0)
      .map((_, i) => i + 1),
  );
const chosenCards = ref(chooseCards());
const cards = computed(() => chunk(chosenCards.value, cols.value));
const chosenValues = ref(chooseValues());
const values = computed(() => chunk(chosenValues.value, cols.value));

const selectedCard = ref("");
const handleSelected = (value?: string) => {
  if (value) selectedCard.value = value;
};
const handleDeselect = () => (selectedCard.value = "");

const handleRoll = () => {
  handleDeselect();
  chosenCards.value = chooseCards();
  chosenValues.value = chooseValues();
  handleResize();
};
watch([cardSets, n], handleRoll);
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
        v-model="n"
        label="Number of choices"
        :max="allCards.length"
        min="2"
      />
    </template>

    <div ref="container" class="dice-container">
      <div class="dice">
        <div v-for="(row, j) in cards" :key="j" class="dice-row">
          <CardTile
            v-for="(card, i) in row"
            :key="card.id"
            :action="CardTileAction.overlay"
            :hotkey="(j * cols + i).toString()"
            :image="card.images[0]"
            :selected="selectedCard === card.id"
            :size="`${size}px`"
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
