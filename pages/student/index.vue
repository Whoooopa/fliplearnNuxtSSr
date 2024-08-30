<template>
  <div class="w-screen h-screen md:p-10 pt-10 flex flex-col gap-4 items-center">
    <span class="text-4xl">My Decks</span>
    <ReusableCardlayout class="md:block hidden">
      <SkeletonDeck
      v-if="!dataLoaded"
      />
      <Decks
      v-else-if="serverData?.length" 
      :data="serverData"
      @study-deck="handleStudyDeck"
      />
      <div 
      class="flex flex-col gap-10 w-full h-full justify-center items-center"
      v-else>
        <span>No Deck</span>
        <button class="h-10 py-2 px-4" type="button" @click="navigateTo('/user/search')">Add Deck</button>
      </div>
    </ReusableCardlayout>
    <div class="md:hidden block w-full h-full">
      <SkeletonDeck
      v-if="!dataLoaded"
      />
      <Decks
      v-else-if="serverData?.length" 
      :data="serverData"
      @study-deck="handleStudyDeck"
      />
      <div 
      class="flex flex-col gap-10 w-full h-full justify-center items-center"
      v-else>
        <span>No Deck</span>
        <button class="h-10 py-2 px-4" type="button" @click="navigateTo('/user/search')">Add Deck</button>
      </div>
    </div>
</div>
</template>

<script lang="ts" setup>
const { data: serverData } = await useFetch<Array<personalizedDeck>>('/api/user/personalizedDecks');
const dataLoaded = ref(false);
const router = useRouter();
console.log(serverData)
onMounted(()=>{
  dataLoaded.value = true;
})

function handleStudyDeck(deckId: String) {
  router.push(`/student/study/${deckId}`);
}
</script>

<style>

</style>