<script setup lang="ts">
import { type Tool } from "@/types";
import { mdiCogs, mdiInformation } from "@mdi/js";

const { tool } = defineProps<{ tool: Tool }>();
</script>

<template>
  <SettingsMenu>
    <slot />

    <template #panels>
      <!-- About -->
      <SettingsMenuPanel :icon="mdiInformation" label="About">
        {{ tool.description }}
      </SettingsMenuPanel>

      <!-- Controls -->
      <ToolMenuControlsPanel
        v-if="tool.controls.length"
        :controls="tool.controls"
      />

      <!-- Global settings -->
      <SettingsMenuPanel :icon="mdiCogs" label="Global Settings">
        <GlobalSettings />
      </SettingsMenuPanel>
    </template>
  </SettingsMenu>
</template>
