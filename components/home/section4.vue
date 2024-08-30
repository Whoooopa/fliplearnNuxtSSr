<template>
  <div class="h-screen bg-accent md:px-2 px-10 flex lg:flex-row flex-col justify-center items-center gap-28">
    <div class="relative w-80 h-80">
      <CardLearn class="absolute top-0 z-20 md:scale-100 scale-75" 
      :is-question="true"
      :question="'What is the metrics unit for height?'"
      :answers="answers"/>
      <CardShadow class="absolute xl:top-5 xl:right-5 md:top-2 md:right-2 top-1 right-1 z-0 md:scale-100 scale-75"/>
    </div>
    <span class="text-white md:text-5xl text-2xl font-extrabold md:w-1/2">Add a quiz to test your student’s understanding</span>
  </div>
</template>

<script lang="ts" setup>
const answers = [
  {
    text: "meters",
    truth: true
  },
  {
    text: "lbs",
    truth: false
  },
  {
    text: "kg",
    truth: false
  },
  {
    text: "miles",
    truth: false
  }
]
</script>

<style>

</style>