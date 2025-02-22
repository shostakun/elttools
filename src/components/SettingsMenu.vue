<script setup lang="ts">
import { mdiCogs } from "@mdi/js";
</script>

<template>
  <div class="tool-menu-container">
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title>
          <v-icon :icon="mdiCogs" />
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <!-- Relevant settings for the context -->
          <slot />

          <v-expansion-panels>
            <slot name="panels" />
          </v-expansion-panels>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style lang="scss">
.sub-panel-title {
  align-items: center;
  display: flex;
  gap: 0.5rem;
}

.tool-menu-container {
  max-width: 400px;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
