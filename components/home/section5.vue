<template>
  <div class="h-screen bg-softbackground xl:px-2 flex xl:flex-row flex-col justify-center items-center gap-10">
    <div v-for="card in cards" class="flex flex-col items-center text-center xl:w-1/2 w-3/4 xl:mx-14 xl:py-20 md:py-16 md:px-5 py-5 rounded-xl shadow-xl border-t-2 border-x-2">
      <span class="text-accent xl:text-5xl md:text-3xl text-xl font-extrabold xl:w-3/4 xl:mb-40 md:mb-32 mb-10">{{ card.header }}</span>
      <span class="text-secondary xl:text-2xl md:text-xl font-extrabold xl:w-1/2 mb-10">{{ card.prompt }}</span>
      <button>
        <NuxtLink :to="{ name: 'register', query: { type: card.type } }">
          Sign Up
        </NuxtLink>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const cards = [
  {
    header: "Customize your own flashcard now",
    prompt: "Get teacher account",
    type: "teacher"
  },
  {
    header: "Experience learning with us",
    prompt: "Get student account",
    type: "student"
  }
]
</script>

<style>

</style>