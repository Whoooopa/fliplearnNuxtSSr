<template>
  <span class="px-2 py-0.5 h-8 rounded-md bg-accent whitespace-nowrap">
    {{ tag }}
  </span>
</template>

<script lang="ts" setup>
defineProps({
  tag: String
})
</script>

<style>

</style>