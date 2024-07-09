<template>
  <div class="w-screen h-screen p-10 flex flex-col gap-4 items-center">
    <span class="text-4xl">My Decks</span>
    <ReusableCardlayout>
      <Decks
      v-if="dataLoaded" 
      :data="serverData ?? undefined"
      @edit-deck="handleEditDeck"
      @delete-deck="handleDeleteDeck"
      />
    </ReusableCardlayout>
</div>
</template>

<script lang="ts" setup>
const { data: serverData } = await useFetch<Array<personalizedDeck>>('/api/teacher/personalizedDecks');
const dataLoaded = ref(false);

const router = useRouter();
const publicStore = usePublicStore();

function handleEditDeck(deckId: String){
  router.push('teacher/editDeck/'+ deckId);
}
function handleDeleteDeck(deckId: String){
  console.log('delete ' + deckId);
  // publicStore.$patch({
  //   editCardId: deckId
  // })
  // router.push('teacher/editDeck');
}
onMounted(()=>{
  dataLoaded.value = true;
})
</script>

<style>

</style>