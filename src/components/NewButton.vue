<script setup lang="ts">
import { mdiCreation } from "@mdi/js";
import { computed } from "vue";
import type { VTooltip } from "vuetify/components";

type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A;
type Anchor = UnwrapReadonlyArray<VTooltip["location"]>;

const props = defineProps<{
  location?: Anchor;
  text?: string;
}>();

const location = computed(() => props.location ?? "bottom start");
const text = computed(() => props.text ?? "Choose new cards");

const emit = defineEmits<{ click: [event: MouseEvent] }>();
const handleClick = (event: MouseEvent) => emit("click", event);
</script>

<template>
  <v-tooltip :location="location" :text="text">
    <template #activator="{ props: activatorProps }">
      <v-btn :icon="mdiCreation" v-bind="activatorProps" @click.prevent="handleClick" />
    </template>
  </v-tooltip>
</template>
