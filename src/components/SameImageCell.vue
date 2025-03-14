<script setup lang="ts">
import { type Card, Highlight } from "@/types/cards";
import classNames from "classnames";
import { computed } from "vue";

const { answers, card, guess } = defineProps<{
  answers: Card[];
  card: Card;
  guess: Card | null;
}>();
const emit = defineEmits<{ answered: [card: Card] }>();

const highlight = computed(() => {
  if (!guess) return Highlight.none;
  if (answers.includes(card)) return Highlight.correct;
  if (card === guess) return Highlight.incorrect;
  return Highlight.none;
});

const handleClick = () => {
  emit("answered", card);
};
</script>

<template>
  <td
    :class="
      classNames('same-image-cell', {
        'same-image-cell-correct': highlight === Highlight.correct,
        'same-image-cell-incorrect': highlight === Highlight.incorrect,
      })
    "
    @click="handleClick"
  >
    <v-img :src="card?.images[0]" height="100px" width="100px" />
  </td>
</template>

<style lang="scss">
.same-image-cell {
  border-radius: 0.5rem;
  padding: 0.5rem;
}

.same-image-cell-correct {
  background-color: lightgreen;
}

.same-image-cell-incorrect {
  background-color: pink;
}
</style>
