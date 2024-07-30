<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <ReusableCardlayout>
      <div 
      class="flex items-center mt-5 h-full flex-col">
        <div>{{ currentProgress + " of " + maxQuestions }}</div>
        <CardPreview 
        :prev-title="currentCard.card.title"
        :prev-desc="currentCard.card.desc"
        :prev-question="currentCard.card.question"
        :prev-answers="currentCard.card.answers"
        :prev-url="currentCard.card.imgUrl"
        :prev-id="currentCard.docId"
        :is-question="true"
        :is-quiz="true"
        @guess="handleGuess"
        />
      </div>
    </ReusableCardlayout>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
const userStore = useMyUserStore();
const currentProgress = computed(()=> userStore.$state.quizCurrentProgress);
const maxQuestions = computed(()=> userStore.$state.quizMaxQuestion);
const currentCard = computed(()=> userStore.$state.quizCards[currentProgress.value - 1])

const message = ref('');
function handleGuess(answer: answer) {
  console.log(answer)
  if(answer.truth){
    userStore.$patch({
      quizTotalPoints: userStore.$state.quizTotalPoints + 1
    })
    message.value = "Congrats your answer is correct !"
  } else {
    message.value = "Too bad your answer is incorrect !"
  }

  if(currentProgress.value < maxQuestions.value){

    setTimeout(()=>{
      userStore.$patch({
        quizCurrentProgress: userStore.$state.quizCurrentProgress + 1
      })
    },
    700)
  } else {
    router.push("/student/result");
  }
}
</script>

<style>

</style>