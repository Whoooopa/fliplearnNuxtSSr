<template>
  <div class="w-80 h-96 bg-customPrimary-50 rounded-md shadow-md">
    <div class="flex flex-col text-center items-center">
      <div class="w-72 h-40 m-auto pt-4">
        <div class="w-64 h-full mx-auto">
          <img :src="imgSrc" alt="upload image"
          class="w-full h-full object-contain rounded-md bg-white cursor-pointer hover:opacity-70" />
        </div>
      </div>
      <p class="p-2 md:text-2xl font-semibold overflow-y-auto w-64 h-16" v-if="!isQuestion">
        {{ prevTitle }}
      </p>
      <p class="p-2 px-4 md:text-lg font-medium w-64 overflow-y-auto" v-else>
        {{ prevQuestion }}
      </p>
      <p class="px-4 overflow-y-auto w-64 h-40" v-if="!isQuestion">
        {{ prevDesc }}
      </p>
      <div class="flex flex-col gap-1 items-center" v-else>
        <div v-for="(answer, index) in answers.answers" class="rounded-xl border-customPrimary border-2 w-full flex flex-start px-3 py-[0.15rem] items-center gap-2" :class="revealAnswerClass.answersClass[index].text" @click="handleAnswer(answer, index)">
          <span class="text-[14px] w-48 px-2" >{{ answer.text }}</span>
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
  isQuiz: {
    type: Boolean,
    default: false,
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
const revealAnswerClass = reactive({
  answersClass: [
    {
      text: 'cursor-pointer bg-softbackground',
    },
    {
      text: 'cursor-pointer bg-softbackground',
    },
    {
      text: 'cursor-pointer bg-softbackground',
    },
    {
      text: 'cursor-pointer bg-softbackground',
    }
  ] 
})

const isClicked = ref(false);
const emits = defineEmits(['guess'])
function handleAnswer(answer: answer, index: number) {
  if(props.isQuiz && !isClicked.value){
    revealAnswerClass.answersClass.forEach((answer, idx)=>{
      answer.text = answers.answers[idx].truth ? 'bg-green-500': 'bg-red-500'
    })
    emits('guess', answer);
    isClicked.value = true;
  }
}
watch(props,
()=>{
  imgSrc.value = props.prevUrl ?? '';
  answers.answers.forEach((answer, idx)=>{
    answer.text = props.prevAnswers![idx].text;
    answer.truth = props.prevAnswers![idx].truth;
  })
  isClicked.value = false;
  
  revealAnswerClass.answersClass.forEach((answer, idx)=>{
      answer.text = 'cursor-pointer bg-softbackground'
  })
},  
{ deep:true })
</script>

<style scoped>

.p {
  word-wrap: break-word;
}

</style>