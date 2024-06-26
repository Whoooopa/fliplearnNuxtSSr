<template>
  <div>
    <h2>Server</h2>
    <pre>{{ serverData }}</pre>
</div>
</template>

<script lang="ts" setup>
//test for ssr data fetching
const { data: serverData } = useFetch('/api/animal');
</script>

<style>

</style>