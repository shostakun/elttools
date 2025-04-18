<script setup lang="ts">
import { mdiChevronDoubleRight, mdiCogs } from "@mdi/js";
import { ref, useSlots } from "vue";

const { globalSettings } = defineProps<{ globalSettings?: boolean }>();
const slots = useSlots();

const drawer = ref(false);
const openDrawer = () => (drawer.value = true);
</script>

<template>
  <v-fab
    v-if="!drawer"
    absolute
    app
    icon
    location="top right"
    @click="openDrawer"
    @mouseenter="openDrawer"
  >
    <v-icon :icon="mdiCogs" />
  </v-fab>

  <v-navigation-drawer v-model="drawer" location="right" temporary width="400">
    <v-list>
      <v-list-item title="Settings">
        <template #prepend>
          <v-btn
            :icon="mdiChevronDoubleRight"
            variant="plain"
            @click="drawer = false"
          />
        </template>
      </v-list-item>
    </v-list>

    <v-divider v-if="slots.default" />

    <div class="drawer-content">
      <!-- Relevant settings for the context -->
      <slot />

      <v-expansion-panels
        v-if="slots.panels"
        class="drawer-panels"
        variant="accordion"
      >
        <!-- Additional expansion panels -->
        <slot name="panels" />
      </v-expansion-panels>

      <!-- Global settings -->
      <v-expansion-panels
        v-if="globalSettings"
        class="drawer-panels"
        variant="accordion"
      >
        <SettingsMenuPanel :icon="mdiCogs" label="Global Settings">
          <GlobalSettings />
        </SettingsMenuPanel>
      </v-expansion-panels>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.drawer-content {
  padding: 1rem;
}

.drawer-panels {
  margin-top: 1rem;
}
</style>
