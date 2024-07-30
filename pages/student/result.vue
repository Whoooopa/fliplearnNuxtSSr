<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <ReusableCardlayout class="flex flex-col justify-around items-center">
      <span class="text-4xl">{{ deckName }}</span>
      <div class="flex flex-col items-center">
        <span class="text-xl">Your score is {{ totalPoints }} / {{ maxQuestions }}</span>
        <span class="text-xl">Accuracy : {{ totalPoints / maxQuestions * 100 }} %</span>
      </div>
      <button @click="router.push('/student')">Finish</button>
    </ReusableCardlayout>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const userStore = useMyUserStore();
const deckName = computed(()=> userStore.$state.quizDeckName)
const totalPoints = computed(()=> userStore.$state.quizTotalPoints)
const maxQuestions = computed(()=> userStore.$state.quizMaxQuestion)
onUnmounted(()=>{
  userStore.$patch({
    quizTags: [],
    quizCards: [],
    quizDeckName: '',
    quizDeckId: '',
    quizTotalPoints: 0,
    quizCurrentProgress: 0,
    quizMaxQuestion: 0,
  })
})
</script>

<style>

</style>