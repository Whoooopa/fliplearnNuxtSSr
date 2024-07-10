<template>
  <div class="w-80 h-96 bg-customPrimary-50 rounded-md shadow-md">
    <div class="flex flex-col text-center">
      <div class="w-72 h-40 m-auto pt-4">
        <div class="w-64 h-full mx-auto">
          <img :src="imgSrc" alt="upload image"
          class="w-full h-full object-contain rounded-md bg-white cursor-pointer hover:opacity-70" />
        </div>
      </div>
      <p class="p-2 md:text-2xl font-semibold line-clamp-2 h-14 w-64 text-center" v-if="!isQuestion">
        {{ prevTitle }}
      </p>
      <p class="p-2 px-4 md:text-lg font-medium w-64 text-center" v-else>
        {{ prevQuestion }}
      </p>
      <p class="px-4 line-clamp-4 w-64 text-center" v-if="!isQuestion">
        {{ prevDesc }}
      </p>
      <div class="flex flex-col gap-1 items-center" v-else>
        <div v-for="(answer, index) in answers.answers" class="rounded-xl border-customPrimary border-2 w-3/4 bg-softbackground flex flex-start px-3 py-[0.15rem] items-center gap-2">
          <input type="text" v-model="answer.text" class="text-[14px] w-11/12 px-2" :class="answer.truth ? 'bg-green-500' : 'bg-red-500' " 
          disabled/>
          <div class="flex justify-center items-center w-1/12">
            <Icon :name="answer.truth ? 'i-mdi:check' : 'i-mdi:close'"
            class="cursor-pointer"/>
          </div>
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  isQuestion: {
    type: Boolean,
    default: false
  },
  prevTitle: String,
  prevDesc: String,
  prevQuestion: String,
  prevAnswers: Array<answer>,
  prevUrl: String,
  prevId: String
})

const title = ref(props.prevTitle ?? '');
const desc = ref(props.prevDesc ?? '');
const question = ref(props.prevQuestion ?? '');
const answers = reactive({
  answers: [
    {
      text: props.prevAnswers ? props.prevAnswers[0].text : '',
      truth: props.prevAnswers ? props.prevAnswers[0].truth : false
    },
    {
      text: props.prevAnswers ? props.prevAnswers[1].text : '',
      truth: props.prevAnswers ? props.prevAnswers[1].truth : false
    },
    {
      text: props.prevAnswers ? props.prevAnswers[2].text : '',
      truth: props.prevAnswers ? props.prevAnswers[2].truth : false
    },
    {
      text: props.prevAnswers ? props.prevAnswers[3].text : '',
      truth: props.prevAnswers ? props.prevAnswers[3].truth : false
    }
  ] as answer[]
})

const imgSrc = ref(props.prevUrl ?? 'https://api.iconify.design/material-symbols:imagesmode.svg');
</script>

<style scoped>

.p {
  word-wrap: break-word;
}

</style>