<script setup lang="ts">
defineProps<{ msg: string }>()
setTimeout(() => {}, 1000)
</script>

<template>
  <h1>{{ msg }}</h1>
  <a-space wrap>
    <a-button type="primary">Primary Button</a-button>
    <a-button>Default Button</a-button>
    <a-button type="dashed">Dashed Button</a-button>
    <a-button type="text">Text Button</a-button>
    <a-button type="link">Link Button</a-button>
  </a-space>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
