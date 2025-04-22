<script lang="ts" setup>
import { defaultSet } from "@/assets/cards";
import { type Card } from "@/types/cards";
import tools from "@/types/tools";
import { useKeys } from "@/utils/keys";
import { calcOneRowLayout, useResize } from "@/utils/resize";
import { mdiRefresh } from "@mdi/js";
import { sample, shuffle } from "lodash";
import { computed, onMounted, ref, useTemplateRef, watch } from "vue";
import draggable from "vuedraggable";

const cardSet = ref(defaultSet);
const cards = ref<Card[]>([]);
const n = computed(() => cards.value.length);

const sizer = useTemplateRef("sizer");
const { handleResize, size } = useResize(sizer, n, calcOneRowLayout);

const handleShuffle = () => {
  cards.value = shuffle(cardSet.value.cards);
  handleResize();
};
watch(cardSet, handleShuffle);
const { onKey } = useKeys();
onKey("Enter", handleShuffle);
onMounted(handleShuffle);

const startLabel = ref("");
const endLabel = ref("");

const list = ref<Array<{ card: Card; id: number }>>([]);
watch(
  cards,
  () => (list.value = cards.value.map((card, i) => ({ card, id: i }))),
);
</script>

<template>
  <Tool :tool="tools.ordering">
    <template #toolbar>
      <v-btn :icon="mdiRefresh" @click="handleShuffle" />
    </template>

    <template #tool-menu>
      <CardSetSelector v-model="cardSet" />
      <v-text-field v-model="startLabel" label="Start label" suffix="→" />
      <v-text-field v-model="endLabel" label="End label" prefix="→" />
    </template>

    <div ref="sizer" class="ordering-sizer">
      <div v-if="startLabel" class="ordering-label">{{ startLabel }} →</div>
      <draggable v-model="list" class="ordering-sortable" item-key="id">
        <template #item="{ element: { card } }">
          <OrderingCell
            :key="card.id"
            :image="sample(card.images)!"
            :size="`${size}px`"
          />
        </template>
      </draggable>
      <div v-if="endLabel" class="ordering-label ordering-label-end">
        → {{ endLabel }}
      </div>
    </div>
  </Tool>
</template>

<style lang="scss">
.ordering-label {
  align-self: flex-start;
  font-size: 3rem;
}

.ordering-label-end {
  align-self: flex-end;
}

.ordering-sizer {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
}

.ordering-sortable {
  display: flex;
  flex-wrap: nowrap;
  max-width: 100%;
  overflow: hidden;
}
</style>
