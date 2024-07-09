<template>
  <div class="w-80 h-96 bg-customPrimary-50 rounded-md shadow-md">
    <div class="flex flex-col text-center">
      <div class="w-72 h-40 m-auto pt-4">
        <label for="upload-photo" class="w-full h-full">
          <div class="w-full h-full ">
            <img :src="imgSrc" alt="upload image"
            class="w-full h-full object-contain rounded-md bg-white cursor-pointer hover:opacity-70" />
          </div>
        </label>
        <input type="file" class="absolute -z-10 opacity-0" id="upload-photo" accept="image/*" v-on:change="onFileChange"/>
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

defineProps({
  isQuestion: {
    type: Boolean,
    default: false
  }
})

const title = ref('');
const desc = ref('');
const question = ref('');
const answers = reactive({
  answers: [
    {
      text: '',
      truth: false
    },
    {
      text: '',
      truth: false
    },
    {
      text: '',
      truth: false
    },
    {
      text: '',
      truth: false
    }
  ] as answer[]
})

const toggleTruth = (index: number) => {
  answers.answers[index].truth = !answers.answers[index].truth;
  emitData();
}

const imgSrc = ref('https://api.iconify.design/material-symbols:imagesmode.svg');
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