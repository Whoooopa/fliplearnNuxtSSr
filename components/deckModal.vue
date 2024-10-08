<template>
  <div class="w-full h-full absolute top-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center">
    <div class="w-5/6 h-5/6 md:p-12 p-4 bg-white relative rounded-md" v-if="status != 'pending'">
      <Icon name="i-material-symbols:close" class="w-8 h-8 absolute top-4 right-4 cursor-pointer" 
      @click="$emit('close-modal')"/> 
      <span class="text-2xl">{{ deck?.name }}</span>
      <br/>
      <span class="text-slate-500 pl-1"> created by {{ deck?.owner }}</span>
      <div class="w-full h-[90%] flex md:flex-row flex-col md:justify-center"
      v-if="deck?.cards">
        <V3Carousel
          ref="myCarousel" 
          id="gallery" 
          class="md:w-[600px] w-[100%] md:h-64 h-[80%]"
          v-model="mainCarousel">
            <V3Slide v-for="cardDoc in deck?.cards" :key="cardDoc.docId" class="relative flex flex-col gap-y-5">
              <CardPreview
              :prev-title="cardDoc.card.title"
              :prev-desc="cardDoc.card.desc"
              :prev-question="cardDoc.card.question"
              :prev-answers="cardDoc.card.answers"
              :prev-url="cardDoc.card.imgUrl"
              :is-question="cardDoc.card.isQuestion"
              />
              <div class="absolute md:top-1/2 top-1/4 md:right-10 right-2 p-2 bg-secondary rounded-md cursor-pointer"
              @click="cardDoc.card.isQuestion = !cardDoc.card.isQuestion">
                <Icon name="i-material-symbols:360" class="w-8 h-8" />
              </div>
            </V3Slide>
        </V3Carousel>
        <div class="md:w-1/2 w-full md:h-full h-[20%] flex flex-row md:flex-wrap overflow-x-auto overflow-y-auto">
          <div class="w-1/3 md:h-1/2"
          v-for="(cardDoc, index) in deck?.cards" :key="cardDoc.docId">
            <CardPreview
            :prev-title="cardDoc.card.title"
            :prev-desc="cardDoc.card.desc"
            :prev-question="cardDoc.card.question"
            :prev-answers="cardDoc.card.answers"
            :prev-url="cardDoc.card.imgUrl"
            class="cursor-pointer transform md:scale-50 scale-[0.3] origin-top-left"
            @click="slideTo(index)"
            />
          </div>
        </div>
      </div>
      <div 
      v-else
      class="flex flex-col h-full justify-center items-center text-slate-500">
        <span>No cards yet</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: String,
})


const mainCarousel = ref(0)

function slideTo(val: number) {
  mainCarousel.value = val;
}

const { data: deck, status } = await useFetch<deck>(`/api/user/deck/${props.id}`);
</script>

<style scoped>
#gallery .carousel__slide {
  padding: 5px;
}

@media (min-width: 1024px) {
  #gallery .carousel__viewport {
    perspective: 600px;
  }
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

</style>