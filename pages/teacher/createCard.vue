<template>
  <div class="w-screen h-screen flex flex-row">
    <div class="w-1/2 flex flex-col justify-center items-center gap-14">
      <CardEdit
      :isQuestion="isFlipped" 
      @update="updateCardData"/>
      <button
      @click="isFlipped = !isFlipped">
        Flip
      </button>
    </div>
    <div class="w-1/2 bg-white flex flex-col justify-center items-center gap-20">
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
  </div>
</template>

<script lang="ts" setup>
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
  }
  catch(e){
    console.log(e)
  }
}
</script>

<style>

</style>