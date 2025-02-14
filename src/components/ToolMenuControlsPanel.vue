<script setup lang="ts">
import { type ToolControl } from "@/types";
import { mdiGamepadSquare } from "@mdi/js";

const { controls } = defineProps<{ controls: ToolControl[] }>();
</script>

<template>
  <v-expansion-panel>
    <v-expansion-panel-title class="sub-panel-title">
      <v-icon :icon="mdiGamepadSquare" />
      Controls
    </v-expansion-panel-title>
    <v-expansion-panel-text>
      <v-table density="compact">
        <tbody>
          <tr v-for="(control, i) in controls" :key="i">
            <td>{{ control.action.join("/") }}</td>
            <td>{{ control.result }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
