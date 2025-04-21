<script setup lang="ts" generic="T = never">
import { CardTileAction } from "@/types";
import { useKeys } from "@/utils/keys";
import classNames from "classnames";

const { action, image, hotkey, selected, size, value } = defineProps<{
  action?: CardTileAction;
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
  <div class="card-cell" :style="{ height: size, width: size }">
    <div
      :class="
        classNames('card-image', {
          'card-highlight': selected && action === CardTileAction.highlight,
        })
      "
      @click.prevent.stop="handleSelect"
    >
      <v-img :src="image" />
    </div>
    <div
      v-if="action === CardTileAction.overlay"
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
.card-cell {
  padding: 0.5rem;
  position: relative;
}

.card-image {
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
