<script lang="ts" setup>
import { defaultSet } from "@/assets/cards";
import { type Card } from "@/types/cards";
import tools from "@/types/tools";
import { useKeys } from "@/utils/keys";
import { useResize } from "@/utils/resize";
import { mdiRefresh } from "@mdi/js";
import { sample, shuffle } from "lodash";
import { onMounted, ref, useTemplateRef, watch } from "vue";
import draggable from "vuedraggable";

const cardSet = ref(defaultSet);
const cards = ref<Card[]>([]);

const sizer = useTemplateRef("sizer");
const size = ref(100);
const handleResize = () => {
  const rect = sizer.value?.getBoundingClientRect();
  if (rect) size.value = rect.width / cards.value.length;
};
useResize(handleResize);

const handleShuffle = () => {
  cards.value = shuffle(cardSet.value.cards);
  handleResize();
};
watch(cardSet, handleShuffle);
const { onKey } = useKeys();
onKey("Enter", handleShuffle);
onMounted(handleShuffle);

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
    </template>

    <div ref="sizer" class="ordering-sizer">
      <draggable v-model="list" class="ordering-sortable" item-key="id">
        <template #item="{ element: { card } }">
          <OrderingCell
            :key="card.id"
            :image="sample(card.images)!"
            :size="`${size}px`"
          />
        </template>
      </draggable>
    </div>
  </Tool>
</template>

<style lang="scss">
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
