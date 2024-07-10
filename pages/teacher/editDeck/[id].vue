<template>
  <form class="w-screen h-screen flex justify-center items-center" @submit.prevent="editDeck">
    <ReusableCardlayout class="relative">
      <ClientOnly>
        <div class="w-full h-full" v-if="showCards">
          <div class="flex flex-col justify-center items-center h-full" v-if="currentCards?.length">
            <V3Carousel 
            id="gallery" 
            class="w-[600px] h-64"
            v-model="carouselCurrentSlide">
              <V3Slide v-for="cardDoc in currentCards" :key="cardDoc.docId">
                <CardEdit
                :prev-title="cardDoc.card.title"
                :prev-desc="cardDoc.card.desc"
                :prev-question="cardDoc.card.question"
                :prev-answers="cardDoc.card.answers"
                :prev-url="cardDoc.card.imgUrl"
                :prev-id="cardDoc.docId"
                />
              </V3Slide>
            </V3Carousel>
            
            <div class="flex flex-row gap-10 mt-28">
              <button class="w-20 h-10 p-2 z-10" type="button">Edit</button>
              <button class="w-20 h-10 p-2 z-10 bg-red-500" @click="deleteCard" type="button">Delete</button>
            </div>
            <V3Carousel
              id="thumbnails"
              class="w-[800px] h-72 -mt-10"
              :items-to-show="5"
              :wrap-around="true"
              v-model="carouselCurrentSlide"
              ref="carousel"
            >
              <V3Slide v-for="(cardDoc, index) in currentCards" :key="cardDoc.docId">
                <CardPreview
                :prev-title="cardDoc.card.title"
                :prev-desc="cardDoc.card.desc"
                :prev-question="cardDoc.card.question"
                :prev-answers="cardDoc.card.answers"
                :prev-url="cardDoc.card.imgUrl"
                @click="slideTo(index - 1)"
                class="cursor-pointer"
                />
                
              </V3Slide>
              <template #addons>
                <V3Navigation />
              </template>
            </V3Carousel>
          </div>
          <div 
          class="flex flex-col gap-10 w-full h-full justify-center items-center"
          v-else>
            <span>No Card</span>
            <button class="h-10 py-2 px-4" type="button" @click="navigateTo('/teacher/createCard')">Create Card</button>
          </div>
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
  </form>
</template>

<script lang="ts" setup>
const route = useRoute();
const { data: deck, } = await useFetch<deck>(`/api/user/deck/${route.params.id}`);

const currentDeckName = ref<string>()
const currentTags = ref<Array<string>>()
const currentOwner = ref<string>() 
const currentCards = ref<Array<cardDoc>>() 

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
  itemLoaded.value = true;
})

const showCards = ref(false);



async function editDeck(){

    if(deckData.name.length == 0) {
      errors[0].error = "Deck name cannot be empty"
      return;
    }
    errors[0].error = ""
    if(deckData.tags.length == 0) {
      errors[1].error = "Add at least one tag first"
      return;
    }
    errors[1].error = ""

    // to do edit deck here

    const submissionData = new FormData();
    const submissionTags = deckData.tags.map((tag)=>{ return tag['name']});
    submissionData.append('deckName', deckData.name);
    submissionData.append('tags', JSON.stringify(submissionTags));
    // deckId for update ref
    submissionData.append('deckId', route.params.id.toString());
    // identical object is needed in arrayRemove inside decks field in personalizedDecks collection to remove the object
    submissionData.append('prevDeckName', currentDeckName.value ?? '');
    const prevTags = toRaw(currentTags.value)
    submissionData.append('prevDeckTags', JSON.stringify(prevTags));
    try {
      const res = await fetch('/api/teacher/editdeck', {
        method: "POST",
        body: submissionData
      })
      console.log(res);
    } 
    catch (e){
      console.log(e);
    }
}

async function deleteCard() {
}

const carouselCurrentSlide = ref(0);

function slideTo(val: number) {
  carouselCurrentSlide.value = val;
}
</script>

<style scoped>
#gallery .carousel__slide {
  padding: 5px;
}

#gallery .carousel__viewport {
  perspective: 600px;
}

#gallery .carousel__track {
  transform-style: preserve-3d;
}

#gallery .carousel__slide--sliding {
  transition: 0.5s;
}

#gallery .carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.7);
}

#gallery .carousel__slide--active ~ #gallery .carousel__slide {
  transform: rotateY(20deg) scale(0.7);
}

#gallery .carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.75);
}

#gallery .carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.75);
}

#gallery .carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(0.8);
}

#thumbnails .carousel {
  height: 100px;
}

#thumbnails .carousel__slide {
  height: 21rem;
  padding: 5px;
}

#thumbnails .carousel__viewport {
  perspective: 800px;
}

#thumbnails .carousel__track {
  transform-style: preserve-3d;
}

#thumbnails .carousel__slide--sliding {
  transition: 0.5s;
}

#thumbnails .carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.4);
}

#thumbnails .carousel__slide--active ~ #thumbnails .carousel__slide {
  transform: rotateY(20deg) scale(0.4);
}

#thumbnails .carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.45);
}

#thumbnails .carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.45);
}

#thumbnails .carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(0.5);
}
</style>