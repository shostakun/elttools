<script setup lang="ts" generic="T = never">
import type { CardTileAction, CardTileDensity } from "@/types/cards";
import { useKeys } from "@/utils/keys";
import classNames from "classnames";
import { computed, ref } from "vue";

const props = defineProps<{
  action?: CardTileAction;
  density?: CardTileDensity;
  hotkey?: string | string[];
  image: string;
  selected?: boolean;
  size: string | number;
  value?: T;
}>();

const sizeStr = computed(() =>
  typeof props.size === "string" ? props.size : `${props.size}px`,
);

const emit = defineEmits<{ selected: [value?: T] }>();
const handleSelect = () => {
  if (!props.selected) emit("selected", props.value);
};

const highlighted = computed(
  () => props.selected && props.action === "highlight",
);

const hovered = ref(false);
const handleEndHover = () => (hovered.value = false);
const handleStartHover = () => (hovered.value = props.action === "showOnHover");
const hidden = computed(() => props.action === "showOnHover" && !hovered.value);

const { hotkey } = props;
const { onKey } = useKeys();
if (hotkey) onKey(hotkey, handleSelect);
</script>

<template>
  <div
    :class="
      classNames('card-tile', {
        'card-high-density': density === 'high',
      })
    "
    :style="{ height: sizeStr, width: sizeStr }"
  >
    <div
      :class="
        classNames('card-background', {
          'card-hidden': hidden,
          'card-highlight': highlighted,
          'card-high-density': density === 'high',
        })
      "
      @click.prevent.stop="handleSelect"
      @mouseenter="handleStartHover"
      @mousedown="handleStartHover"
      @mouseleave="handleEndHover"
      @mouseup="handleEndHover"
    >
      <v-img class="card-image" :src="image" />
    </div>
    <div v-if="action === 'overlay' && selected" class="card-overlay">
      <slot name="overlay">
        {{ value }}
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
.card-tile {
  padding: 0.5rem;
  position: relative;

  &.card-high-density {
    padding: 0.25rem;
  }
}

.card-background {
  align-items: center;
  background-color: var(--elt-neutral-background);
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  height: 100%;
  padding: 1rem;
  position: relative;
  width: 100%;

  &.card-hidden {
    background-color: unset;
    border: 0.25rem dashed var(--elt-neutral-background);

    & > * {
      display: none;
    }
  }

  &.card-highlight {
    background-color: lightblue;
  }

  &.card-high-density {
    padding: 0.5rem;
  }
}

.card-image {
  border-radius: 0.5rem;
  overflow: hidden;
}

.card-overlay {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
