<script setup lang="ts">
import { type ToolControl } from "@/types";
import { mdiGamepadSquare } from "@mdi/js";

const { controls } = defineProps<{ controls: ToolControl[] }>();
</script>

<template>
  <SettingsMenuPanel :icon="mdiGamepadSquare" label="Controls">
    <v-table density="compact">
      <tbody>
        <tr v-for="(control, i) in controls" :key="i">
          <td>{{ control.action.join("/") }}</td>
          <td>{{ control.result }}</td>
        </tr>
      </tbody>
    </v-table>
  </SettingsMenuPanel>
</template>
