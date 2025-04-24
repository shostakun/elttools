<script setup lang="ts">
import { type Tool } from "@/types";
import { mdiInformation } from "@mdi/js";

const { tool } = defineProps<{ tool: Tool }>();
</script>

<template>
  <SettingsMenu global-settings>
    <slot />

    <template #panels>
      <!-- About -->
      <SettingsMenuPanel :icon="mdiInformation" label="About">
        <Markdown :text="tool.description" />
      </SettingsMenuPanel>

      <!-- Controls -->
      <ToolMenuControlsPanel v-if="tool.controls.length" :controls="tool.controls" />
    </template>
  </SettingsMenu>
</template>
