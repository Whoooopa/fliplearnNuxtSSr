<template>
  <div class="w-screen p-10">
    <span class="text-4xl">My Decks</span>
    <!-- <pre>{{ serverData }}</pre> -->
    <Decks 
    :data="serverData ?? undefined"/>
</div>
</template>

<script lang="ts" setup>
//test for ssr data fetching
// console.log(useCookie(useRuntimeConfig().public.authCookieName));
const { data: serverData } = useFetch<Array<personalizedDeck>>('/api/teacher/personalizedDecks');
</script>

<style>

</style>