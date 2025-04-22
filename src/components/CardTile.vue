<script setup lang="ts" generic="T = never">
import type { CardTileAction, CardTileDensity } from "@/types/cards";
import { useKeys } from "@/utils/keys";
import classNames from "classnames";

const { action, density, image, hotkey, selected, size, value } = defineProps<{
  action?: CardTileAction;
  density?: CardTileDensity;
  hotkey?: string | string[];
  image: string;
  selected?: boolean;
  size: string;
  value?: T;
}>();

const emit = defineEmits<{ selected: [value?: T] }>();

const handleSelect = () => {
  emit("selected", value);
};

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
    :style="{ height: size, width: size }"
  >
    <div
      :class="
        classNames('card-background', {
          'card-highlight': selected && action === 'highlight',
          'card-high-density': density === 'high',
        })
      "
      @click.prevent.stop="handleSelect"
    >
      <v-img class="card-image" :src="image" />
    </div>
    <div
      v-if="action === 'overlay'"
      class="card-overlay"
      :style="{
        opacity: selected ? 1 : 0,
      }"
      @click.prevent.stop="handleSelect"
    >
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
  background-color: #88888844;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  height: 100%;
  padding: 1rem;
  position: relative;
  width: 100%;

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
