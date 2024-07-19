<template>
  <div class="px-10 py-6 rounded-md shadow-[0_-2px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)] flex flex-row">
    <div class="w-1/2">
      <span class="text-2xl">
        {{ name }}
      </span>
      <div class="mt-2 w-full flex flex-row overflow-x-auto gap-2">
        <ReusableTag v-for="tag in tags?.sort()" :tag="tag.toString()" />
      </div>
    </div>
    <div class="w-1/2 relative flex flex-row justify-end items-end pr-10">
      <div class="w-20 h-10 flex flex-row justify-between absolute top-0 right-0">
        <Icon name="i-material-symbols:add" class="w-8 h-8 cursor-pointer"  
        @click="handleAddToPersonalizedDecks"
        v-if="type == 'student'"/>
        <Icon name="i-ic:baseline-more-vert" class="w-8 h-8 cursor-pointer" 
        @click="openModal = true"/>
      </div>
      <Teleport to="body" v-if="openModal">
        <DeckModal 
        :id="id"
        @close-modal="openModal = false"
        />
      </Teleport>
      <ReusableModal
      v-if="openAddModal"
      :prompt="'Deck has been added'"
      :action="'close'"
      @modal-confirmation="openAddModal = false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  name: String,
  tags: Array<String>,
  id: String,
  owner: String,
})

const type = useCookie('type');
const openModal = ref(false);
const openAddModal = ref(false);

async function handleAddToPersonalizedDecks() {
  await addToPersonalizedDecks()
  openAddModal.value = true;
}

async function addToPersonalizedDecks() {
  try{
    await fetch('/api/student/addPersonalizedDeck',{
      method: "POST",
      body: JSON.stringify({
        deckId: props.id,
        name: props.name,
        tags: props.tags,
        owner: props.owner 
      })
    })
  }
  catch(e){
    console.log(e)
  }
}
</script>

<style>

</style>