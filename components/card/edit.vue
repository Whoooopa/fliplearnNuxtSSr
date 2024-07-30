<template>
  <div class="w-80 h-96 bg-customPrimary-50 rounded-md shadow-md">
    <div class="flex flex-col text-center">
      <div class="w-72 h-40 m-auto pt-4">
        <label :for="prevId" class="w-full h-full">
          <div class="w-full h-full ">
            <img :src="imgSrc" alt="upload image"
            class="w-full h-full object-contain rounded-md bg-white cursor-pointer hover:opacity-70" />
          </div>
        </label>
        <input type="file" class="absolute -z-10 opacity-0" :id="prevId" accept="image/*" v-on:change="onFileChange"/>
      </div>
      <div class="p-2 md:text-2xl font-semibold h-14" v-if="!isQuestion">
        <input placeholder="Enter a title" class="px-0" v-model="title" @input="emitData" />
      </div>
      <div class="p-2 px-4 md:text-lg font-medium" v-else>
        <textarea placeholder="Write a question" class="w-full" v-model="question"  @input="emitData"/>
      </div>
      <div class="px-4" v-if="!isQuestion">
        <textarea class="w-full h-32" v-model="desc" placeholder="Enter a description" @input="emitData"/>
      </div>
      <div class="flex flex-col gap-1 items-center" v-else>
        <div v-for="(answer, index) in answers.answers" class="rounded-xl border-customPrimary border-2 w-3/4 bg-softbackground flex flex-start px-3 py-[0.15rem] items-center gap-2">
          <input type="text" v-model="answer.text" class="text-[14px] w-11/12 px-2" :class="answer.truth ? 'bg-green-500' : 'bg-red-500' " 
          @input="emitData"/>
          <div class="flex justify-center items-center w-1/12">
            <Icon :name="answer.truth ? 'i-mdi:check' : 'i-mdi:close'" @click="toggleTruth(index)"
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
  prevId: {
    type: String,
    default: 'id'
  },
  resetData: {
    type: Boolean,
    default: false
  },
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
// for teacher/editDeck/[id] 
const route = useRoute();
if(route.path.includes('/teacher/editDeck')){

  watch(props, 
    (newValue, oldValue) => {
      if(newValue?.isQuestion != oldValue?.isQuestion) {
        //dont reset data upon flip button click
        title.value = props.prevTitle ?? '';
        desc.value = props.prevDesc ?? '';
        question.value = props.prevQuestion ?? '';
        answers.answers.forEach((answer, index)=>{
          answer.text = props.prevAnswers![index].text ?? '';
          answer.truth = props.prevAnswers![index].truth ?? false;
        })
        imgSrc.value = props.prevUrl ?? 'https://api.iconify.design/material-symbols:imagesmode.svg';
      }
    },
    { deep: true,
      immediate: true,
     }
  )
}

const toggleTruth = (index: number) => {
  answers.answers[index].truth = !answers.answers[index].truth;
  emitData();
}

let file :any|null;
function onFileChange(e: any) {
  file = e.target.files || e.dataTransfer.files;
  imgSrc.value = URL.createObjectURL(file[0]);
  emitData();
}

const emit = defineEmits(['update'])

const emitData = () => {
  emit('update', {
    img: file,
    title: title.value,
    desc: desc.value,
    question: question.value,
    answers: toRaw(answers.answers)
  })
}

</script>

<style>

</style>