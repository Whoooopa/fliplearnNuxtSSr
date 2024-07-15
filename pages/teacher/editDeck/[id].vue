<template>
  <form class="w-screen h-screen flex justify-center items-center" @submit.prevent="editDeck">
    <ReusableCardlayout class="relative">
      <ClientOnly>
        <div class="w-full h-full" v-if="showCards">
          <div class="flex flex-col justify-center items-center h-full" v-if="currentCards?.length">
            <span class="-mb-10">{{ mainCarousel + 1 }} of {{ currentCards.length }}</span>
            <V3Carousel
            ref="myCarousel" 
            id="gallery" 
            class="w-[600px] h-64"
            v-model="mainCarousel"
            @slide-start="setGallery">
              <V3Slide v-for="cardDoc in currentCards" :key="cardDoc.docId" class="relative flex flex-col gap-y-5">
                <CardEdit
                :key="cardDoc.card.imgUrl"
                :prev-title="cardDoc.card.title"
                :prev-desc="cardDoc.card.desc"
                :prev-question="cardDoc.card.question"
                :prev-answers="cardDoc.card.answers"
                :prev-url="cardDoc.card.imgUrl"
                :prev-id="cardDoc.docId"
                :is-question="cardDoc.card.isQuestion"
                :reset-data="resetData"
                @update="updateCardData"
                />
                <div class="absolute top-1/2 right-10 p-2 bg-secondary rounded-md cursor-pointer"
                @click="cardDoc.card.isQuestion = !cardDoc.card.isQuestion">
                  <Icon name="i-material-symbols:360" class="w-8 h-8" />
                </div>
                
                <div class="flex flex-row gap-10">
                  <button class="w-20 h-10 p-2" type="button" @click="editCard(cardDoc.docId)">Edit</button>
                  <button class="w-20 h-10 p-2 bg-red-500" @click="handleDeleteCard(cardDoc.docId)" type="button">Delete</button>
                </div>
              </V3Slide>
            </V3Carousel>
            <V3Carousel
              id="thumbnails"
              class="w-[800px] h-52 mt-40 z-10 "
              :items-to-show="4"
              :wrap-around="false"
              :mouseDrag="false"
              :touchDrag="false"
              v-model="thumbnailCarousel"
              ref="carousel"
            >
              <V3Slide v-for="(cardDoc, index) in currentCards" :key="cardDoc.docId" class="-mt-16">
                <CardPreview
                :prev-title="cardDoc.card.title"
                :prev-desc="cardDoc.card.desc"
                :prev-question="cardDoc.card.question"
                :prev-answers="cardDoc.card.answers"
                :prev-url="cardDoc.card.imgUrl"
                @click="slideTo(index)"
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
            <button class="h-10 py-2 px-4" type="button" @click="navigateTo('/teacher/createcard')">Create Card</button>
          </div>

          <ReusableModal 
          prompt="You have unsaved changes. Do you want to move over"
          action="Stay"
          action2="Don't Save"
          v-if="openModal"
          @modal-confirmation="handleUnsavedChangeConfirmation"
          />
          <ReusableModal
          prompt="Are you sure ?" 
          action="Delete"
          action2="Cancel"
          v-if="tryDelete"
          @modal-confirmation="handleDeleteConfirmation"/>
        </div>
        <ReusableDeckForm
        :prev-deck-name="currentDeckName"
        :prev-tags="currentTags"
        v-else-if="itemLoaded"
        @deck-form-change="updateDeckData">
          <button class="w-20 h-10 p-2" type="submit">Save</button>
        </ReusableDeckForm>

      </ClientOnly>

      <div class="absolute left-5 top-1/2 cursor-pointer" v-if="showCards" @click="handleShowCards">
        <Icon name="i-material-symbols:arrow-back-ios" class="w-8 h-8" />
      </div>
      <div class="absolute right-5 top-1/2 cursor-pointer" v-else @click="handleShowCards">
        <Icon name="i-material-symbols:arrow-forward-ios" class="w-8 h-8" />
      </div>
    </ReusableCardlayout>
  </form>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const { data: deck, } = await useFetch<deck>(`/api/user/deck/${route.params.id}`);

const currentDeckName = ref<string>()
const currentTags = ref<Array<string>>()
const currentOwner = ref<string>() 
const currentCards = reactive<cardDoc[]>([])

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
let cards = [] as cardDoc[]; // is used to revert changes when dont save is chosen in ReusableModal 

onMounted(() => {
  const deckData = toRaw(deck.value)
  if(deckData){
    currentDeckName.value = deckData.name.toString();
    currentTags.value = deckData.tags.map((tag)=> tag.toString());
    currentOwner.value = deckData.owner.toString();
    deckData.cards?.forEach((card)=>{
      currentCards.push(card);
    })
    cards = deckData.cards!;
    //
    if(currentCards.length) {
      cardData.imgUrl = currentCards[0].card.imgUrl ?? undefined ;
      cardData.desc = currentCards[0].card.desc;
      cardData.answers = currentCards[0].card.answers;
      cardData.title = currentCards[0].card.title;
      cardData.question = currentCards[0].card.question;
      cardData.bucketPath = currentCards[0].card.bucketPath;
    }
  }
  itemLoaded.value = true;

  

  watch(mainCarousel, 
  (newValue, oldValue)=>{
    if(currentCards) { // use cardData to store current card data in slot
      // before update compare oldvalue and cardData, cardData receive emit updateCardData
      // if cardData after emit is different from original (currentCards.value), check before moving carousel index
      if(hasDifferences(cardData, currentCards[oldValue])) {
        unsavedChanges.value = true;
        openModal.value = true; 
        indexToSlideTo.value = newValue;
        mainCarousel.value = oldValue;
        previousIndex.value = oldValue;
      }
      //update when moving to another card
      cardData.imgUrl = currentCards[newValue].card.imgUrl ;
      cardData.desc = currentCards[newValue].card.desc;
      cardData.answers = currentCards[newValue].card.answers;
      cardData.title = currentCards[newValue].card.title;
      cardData.question = currentCards[newValue].card.question;
      cardData.bucketPath = currentCards[newValue].card.bucketPath;
    }
  })
})

const unsavedChanges = ref(false);

function hasDifferences(newCard: card, oldCard: cardDoc) : boolean {
  const keys: (keyof card)[] = ['imgUrl', 'desc', 'answers', 'title', 'question'];
  return keys.some(key => newCard[key] !== oldCard.card[key]);
}

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
    } 
    catch (e){
      console.log(e);
    }
}

const chosenCardId = ref('');

function handleDeleteConfirmation(choice: string) {
  if(choice == 'cancel') {
    tryDelete.value = false;
    return
  };
  deleteCard()
}

function handleDeleteCard(cardId: String) {
  chosenCardId.value = cardId.toString();
  tryDelete.value = true;
}

async function deleteCard() {
  try {
    await fetch('/api/teacher/deletecard', {
        method: "POST",
        body: JSON.stringify({
          cardId: chosenCardId.value,
          deckId: route.params.id,
          bucketPath: cardData.bucketPath
        })
      })
  }
  catch (e) {
    console.log(e)
  }
  finally { 
    reloadNuxtApp()
  }
}


const cardData: card = reactive({
  img: null as any | null,
  imgUrl: '',
  title: '',
  desc: '',
  question: '',
  answers: [] as Array<answer>,
  bucketPath: '' 
})

const updateCardData = (data: { img: any,  title: string, desc: string, question: string, answers: Array<answer> }) => {
  cardData.img = data.img ? data.img[0] : null ;
  cardData.title = data.title;
  cardData.desc = data.desc;
  cardData.question = data.question;
  cardData.answers = data.answers;

}

async function editCard (cardId: string) {
  
  const submissionData = new FormData();

  for (const [key, value] of Object.entries(cardData)) {
    if (key != 'answers' && key != 'img' && key != 'imgUrl' && key != 'bucketPath') {
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

  
  submissionData.append('answers', JSON.stringify(cardData.answers));
  submissionData.append('deck', route.params.id.toString());
  submissionData.append('card', cardId);
  submissionData.append('prevUrl', cardData.imgUrl!);
  
  if(cardData.img) {
    submissionData.append('bucketPath', cardData.bucketPath!);
    submissionData.append('img', cardData.img)
  }

  try {
    const res = await fetch('/api/teacher/editcard', {
          method: "POST",
          body: submissionData
        })
  }
  catch(e){
    console.log(e)
  } finally {
    reloadNuxtApp()
  }
}


// mostly ui logic below
const showCards = ref(route.query.showcards ?? false);

function handleShowCards(){
  if(route.query.showcards) {
    router.push({ query: undefined });
  }
  else
  {
    router.push({ query: { 'showcards' : 'true' } });
  } 
  showCards.value = !showCards.value 
}

// carousel logic
//https://github.com/ismail9k/vue3-carousel/issues/367 using workaround when wrap-around false
const mainCarousel = ref(0)
const thumbnailCarousel = ref(0);
const myCarousel = ref(null);

const openModal = ref(false);
const previousIndex = ref(0);
const indexToSlideTo = ref(0);

function slideTo(val: number) {
  if(unsavedChanges.value) {
    openModal.value = true; 
    indexToSlideTo.value = val;
    return;
  } // if no unsaved change let them slide
  mainCarousel.value = val;
  thumbnailCarousel.value = val;
}
const resetData = ref(false);
function handleUnsavedChangeConfirmation(choice: string) {
  openModal.value = false
  // resetData.value = true
  if(choice != 'stay'){
    
    unsavedChanges.value = false;
    mainCarousel.value = indexToSlideTo.value;
    thumbnailCarousel.value = indexToSlideTo.value;
    currentCards![previousIndex.value] = cards[previousIndex.value];
    resetData.value = true; // trigger onChange once
    setTimeout(()=>{
      resetData.value = false;
    }, 10)
    return;
  }

}
// setGallery use emitted data from @slide-start
// https://ismail9k.github.io/vue3-carousel/api/events.html#slide-start
// slidingToIndex
// currentSlideIndex
// prevSlideIndex
// slidesCount
function setGallery(val: any) {
  thumbnailCarousel.value = val.slidingToIndex;
}

const tryDelete = ref(false);
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

#thumbnails .carousel__slide--sliding {
  transition: 0.5s;
}

#thumbnails .carousel__slide {
  opacity: 1;
  transform: scale(0.5);
}

</style>