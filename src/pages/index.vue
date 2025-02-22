<script setup lang="ts">
import { tools } from "@/types";
</script>

<template>
  <SettingsMenu>
    <GlobalSettings />
  </SettingsMenu>

  <div class="container">
    <h1>ELT Tools</h1>
    <h2>for the classroom or online</h2>
    <p>
      These are tools I've built for my own use over the years. Many/most of
      them have been designed with online lessons in mind, but I use them in
      classroom settings as well. Each has some info about how I use them.
    </p>
    <div class="list">
      <ToolListCard v-for="tool in tools" :key="tool.id" :tool="tool" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 800px;
  padding: 2rem;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
