<template>
  <div>
    <h2>Server</h2>
    <pre>{{ serverData }}</pre>
</div>
</template>

<script lang="ts" setup>
//test for ssr data fetching
// console.log(useCookie(useRuntimeConfig().public.authCookieName));
const { data: serverData } = useFetch('/api/animal');
</script>

<style>

</style>