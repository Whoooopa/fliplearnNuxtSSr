<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <ReusableCardlayout class="relative">
      <ClientOnly>
        <div class="relative" v-if="showCards">
          <CardLearn 
          v-for="card in currentCards"
          :title="card.title.toString()"
          :description="card.desc.toString()"
          :question="card.question.toString()"
          :answers="card.answers"
          />
        </div>
        <ReusableDeckForm
        :prev-deck-name="currentDeckName"
        :prev-tags="currentTags"
        v-else-if="itemLoaded"
        @deck-form-change="updateDeckData">
          <button class="w-20 h-10 p-2" type="submit">Save</button>
        </ReusableDeckForm>

      </ClientOnly>

      <div class="absolute left-5 top-1/2 cursor-pointer" v-if="showCards" @click="showCards = false">
        <Icon name="i-material-symbols:arrow-back-ios" class="w-8 h-8" />
      </div>
      <div class="absolute right-5 top-1/2 cursor-pointer" v-else @click="showCards = true">
        <Icon name="i-material-symbols:arrow-forward-ios" class="w-8 h-8" />
      </div>
    </ReusableCardlayout>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const { data: deck, } = await useFetch<deck>(`/api/user/deck/${route.params.id}`);

const currentDeckName = ref<string>()
const currentTags = ref<Array<string>>()
const currentOwner = ref<string>() 
const currentCards = ref<Array<card>>() 

const errors = reactive([
  { field: 'deck', error: '' },
  { field: 'tags', error: '' }
]);

const deckData = reactive({
  name: '',
  tags: [] as tag[]
})

const updateDeckData = (data: { deckName: string, tags: Array<tag> }) => {
  deckData.name = data.deckName;
  deckData.tags = toRaw(data.tags)
}

const itemLoaded = ref(false);

onMounted(() => {
  const deckData = toRaw(deck.value)
  if(deckData){
    currentDeckName.value = deckData.name.toString();
    currentTags.value = deckData.tags.map((tag)=> tag.toString());
    currentOwner.value = deckData.owner.toString();
    currentCards.value = deckData.cards;
  }
  console.log(currentCards.value);
  itemLoaded.value = true;
})

const showCards = ref(false);



async function editDeck(){

    if(deckData.name.length == 0) {
      errors[0].error = "Deck name cannot be empty"
      console.log('nam is empty')
      return;
    }
    errors[0].error = ""
    if(deckData.tags.length == 0) {
      errors[1].error = "Add at least one tag first"
      console.log('tag is empty')
      return;
    }
    errors[1].error = ""

    // to do edit deck here

    // const submissionData = new FormData();
    // const submissionTags = deckData.tags.map((tag)=>{ return tag['name']});
    // submissionData.append('deckName', deckData.name);
    // submissionData.append('tags', JSON.stringify(submissionTags));
    // try {
    //   const res = await fetch('/api/teacher/createdeck', {
    //     method: "POST",
    //     body: submissionData
    //   })
    //   console.log(res);
    // } 
    // catch (e){
    //   console.log(e);
    // }
}
</script>

<style>

</style>