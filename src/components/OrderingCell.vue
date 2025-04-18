<script setup lang="ts">
const { image, size } = defineProps<{
  image: string;
  size: string;
}>();
</script>

<template>
  <div class="ordering-cell" :style="{ height: size, width: size }">
    <div class="ordering-image"><v-img :src="image" /></div>
  </div>
</template>

<style lang="scss" scoped>
.ordering-cell {
  padding: 0.25rem;
  position: relative;

  &:hover {
    cursor: grab;
  }
}

.ordering-image {
  align-items: center;
  background-color: #88888844;
  border-radius: 0.5rem;
  display: flex;
  height: 100%;
  padding: 0.5rem;
  position: relative;
  width: 100%;
}
</style>
