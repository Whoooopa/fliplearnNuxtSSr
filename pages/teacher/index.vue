<template>
  <div class="w-screen h-screen p-10 flex flex-col gap-4 items-center">
    <span class="text-4xl">My Decks</span>
    <ReusableCardlayout>
      <SkeletonDeck
      v-if="!dataLoaded"
      />
      <Decks
      v-else-if="serverData?.length" 
      :data="serverData"
      @edit-deck="handleEditDeck"
      @delete-deck="handleDeleteDeck"
      />
      <div 
      class="flex flex-col gap-10 w-full h-full justify-center items-center"
      v-else>
        <span>No Deck</span>
        <button class="h-10 py-2 px-4" type="button" @click="navigateTo('/teacher/createdeck')">Create Deck</button>
      </div>
      <ReusableModal
      prompt="Are you sure ?"
      action="Delete"
      action2="Cancel"
      v-if="tryDelete"
      @modal-confirmation="handleModal"
      />
    </ReusableCardlayout>
</div>
</template>

<script lang="ts" setup>
const { data: serverData } = await useFetch<Array<personalizedDeck>>('/api/teacher/personalizedDecks');
const dataLoaded = ref(false);
const router = useRouter();

function handleEditDeck(deckId: String) {
  router.push('teacher/editDeck/'+ deckId);
}

const tryDelete = ref(false);
const deckIdToDelete = ref('');

function handleModal(choice: string) {
  if(choice == 'cancel') {
    tryDelete.value = false;
    return;
  }
  deleteDeck()
}

function handleDeleteDeck(deckId: string) {
  tryDelete.value = true;
  deckIdToDelete.value = deckId;
}

async function deleteDeck() {
  try {
    await fetch('/api/teacher/deletedeck', {
        method: "POST",
        body: deckIdToDelete.value
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