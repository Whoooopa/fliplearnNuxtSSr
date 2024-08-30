<template>
  <div class="w-screen lg:h-screen h-[calc(100vh-5rem)] flex lg:flex-row flex-col lg:pt-0 pt-10">
    <div class="lg:w-1/2 lg:h-full h-2/3 flex flex-col justify-center items-center md:gap-14 gap-0 lg:pb-0 md:pb-10 pb-14">
      <CardEdit
      :isQuestion="isFlipped" 
      @update="updateCardData"
      class="transform md:scale-100 scale-90"/>
      <button
      @click="isFlipped = !isFlipped">
        Flip
      </button>
    </div>
    <div class="lg:w-1/2 w-full lg:h-full h-1/3 bg-white flex flex-col justify-center items-center md:gap-20 gap-4 lg:py-1 py-10">
      <span class="text-2xl">
        Select deck to add to :
      </span>
      <USelect 
        placeholder="Choose a deck"
        v-model="selectedDeck"
        :options="decks"
        option-attribute="name"
      />
      <button @click="createCard">
        Add to {{ deckName?.name }}
      </button> 
    </div>
    <ReusableModal
    v-if="openModal" 
    :prompt="'Card created successfuly'"
    :action="'Close'"
    @modal-confirmation="openModal = false"
    />
  </div>
</template>

<script lang="ts" setup>
const openModal = ref(false);
const isFlipped = ref(false);
const selectedDeck = ref('');

const { data } = useFetch<Array<personalizedDeck>>('/api/teacher/personalizedDecks');
const decks = computed(() => toRaw(data.value)?.map((deck)=> ({ name: deck.name, value: deck.deckId })));
const deckName = computed(() => decks.value?.find((deck) => deck.value == selectedDeck.value ))

const cardData = reactive({
  image: null as any | null,
  title: '',
  desc: '',
  question: '',
  answers: [] as Array<{ text: string; truth: boolean }>
})

const updateCardData = (data: { img: any|null,  title: string, desc: string, question: string, answers: Array<{ text: string; truth: boolean }> }) => {
  
  cardData.image = data.img ? data.img[0] : null ;
  cardData.title = data.title;
  cardData.desc = data.desc;
  cardData.question = data.question;
  cardData.answers = data.answers;
}


async function createCard () {
  
  const submissionData = new FormData();

  for (const [key, value] of Object.entries(cardData)) {
    console.log(key, value);
    if (key != 'answers' && key != 'image') {
      if(value === '') return false;
      submissionData.append(key, value.toString());
    }
  }

  // Check each answer's text field
  for (const answer of cardData.answers) {
    if (answer.text === '') {
      return false;
    }
  }

  if(!selectedDeck.value) return;

  
  submissionData.append('answers', JSON.stringify(cardData.answers));
  submissionData.append('deck', selectedDeck.value);
  
  if(cardData.image) submissionData.append('img', cardData.image)
  
  try {
    const res = await fetch('/api/teacher/createcard', {
          method: "POST",
          body: submissionData
        })
    openModal.value = true;
  }
  catch(e){
    console.log(e)
  }
}
</script>

<style>

</style>