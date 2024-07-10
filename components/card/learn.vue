<template>
  <div class="w-80 h-96 bg-customPrimary-50 rounded-md shadow-md">
    <div class="flex flex-col text-center">
      <div class="w-72 h-40 m-auto pt-4">
        <div class="w-full h-full" v-if="imgUrl">
          <img :src="imgUrl" alt="upload image"
          class="w-full h-full object-contain rounded-md bg-white cursor-pointer hover:opacity-70"/>
        </div>
        <div class="bg-black rounded-3xl w-full h-full" v-else>
        </div>
      </div>
      <div class="p-2 md:text-2xl font-semibold" v-if="!isQuestion">{{ title }}</div>
      <div class="p-2 md:text-lg font-medium" v-else>{{ question }}</div>
      <div class="px-4" v-if="!isQuestion">
        <p class="line-clamp-5">
          {{ description }}
        </p>
      </div>
      <div class="flex flex-col gap-1 items-center" v-else>
        <div v-for="answer in answers" class="rounded-xl border-customPrimary border-2 w-3/4 bg-softbackground flex flex-start px-3 py-[0.15rem]">
          <input type="text" disabled v-model="answer.text" class="text-[14px]"/>
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: 'title'
  },
  description: {
    type: String,
    default: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil ipsa ut rerum impedit reiciendis delectus ex expedita iure, fuga deserunt unde, minus vero doloribus animisdkjslkfhskfhsfs hafklasfhasklfhsfklh'
  },
  isQuestion: {
    type: Boolean,
    default: false
  },
  question: {
    type: String,
    default: '' 
  },
  answers: {
    type: Array<answer>,
    default: []
  },
  imgUrl: {
    type: String,
    required: false
  }
})
</script>

<style>

</style>