<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <ReusableCardlayout>
      <div 
      class="flex items-center mt-5 h-full flex-col"
      v-if="dataLoaded">
        <div>{{ 1 + mainCarousel + " of " + data?.cards?.length }}</div>
        <V3Carousel
          ref="myCarousel" 
          class="w-[600px] h-2/3 min-h-[25rem]"
          v-model="mainCarousel">
            <V3Slide v-for="(cardDoc) in data?.cards" :key="cardDoc.docId" class="relative flex flex-col gap-y-5">
              <CardPreview
              :key="cardDoc.card.imgUrl"
              :prevTitle="cardDoc.card.title"
              :prevDesc="cardDoc.card.desc"
              :prevQuestion="cardDoc.card.question"
              :prevAnswers="cardDoc.card.answers"
              :prevUrl="cardDoc.card.imgUrl"
              :prevId="cardDoc.docId"
              />
            </V3Slide>
            <template #addons>
              <V3Navigation/>
            </template>
        </V3Carousel>
        <button
        @click="handleQuiz">Start Quiz</button>
      </div>
      <div 
      class="flex justify-center items-center h-full"
      v-else>
        This deck have no cards
      </div>
    </ReusableCardlayout>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
interface CustomResponse {
  name: string,
  owner: string,
  tags: string[],
  cards: cardDoc[] | null,
}
const { data } = await useFetch<CustomResponse>(`/api/user/deck/${route.params.id}`)
const mainCarousel = ref(0);
const dataLoaded = ref(false);
onMounted(()=>{
  if(data.value?.cards){
    dataLoaded.value = true;
  }
})

const userStore = useMyUserStore()
function handleQuiz() {
  userStore.$patch({
    quizDeckId: route.params.id.toString(),
    quizDeckName: data.value?.name,
    quizTags: data.value?.tags,
    quizCards: data.value?.cards!,
    quizMaxQuestion: data.value?.cards?.length,
    quizCurrentProgress: 1,
    quizTotalPoints: 0,
  })
  router.push('/student/quiz')
}
</script>

<style scoped>

.carousel__slide {
  padding: 5px;
}

.carousel__viewport {
  perspective: 600px;
}

.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.9;
  transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
  opacity: 1;
  transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
  opacity: 1;
  transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1);
}
</style>