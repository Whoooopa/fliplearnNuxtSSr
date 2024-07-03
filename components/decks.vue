<template>
  <div>
    <div v-if="data">
      {{ data }}
    </div>
    <div v-else>
      No data
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  data: {
    type: Array as PropType<Array<personalizedDeck>>,
    default: ()=> [],
  }
})
</script>

<style>

</style>