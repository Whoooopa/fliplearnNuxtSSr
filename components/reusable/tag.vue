<template>
  <span class="px-2 py-0.5 h-6 rounded-md text-sm bg-customPrimary-50 text-slate-500 whitespace-nowrap">
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