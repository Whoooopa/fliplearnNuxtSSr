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
async function handleDeleteDeck(deckId: String){
  console.log('delete ' + deckId);
  try {
    await fetch('/api/teacher/deletedeck', {
        method: "POST",
        body: deckId.toString()
      })
  }
  catch (e) {
    console.log(e)
  }
  finally { // default param is window.location.pathname, re-request path to trigger useFetch
    reloadNuxtApp()
  }
}
onMounted(()=>{
  dataLoaded.value = true;
})
</script>

<style>

</style>