<template>
  <Teleport to="body">
    <div class="absolute top-0 w-full md:h-full h-svh flex justify-center items-center z-50 bg-[rgba(0,0,0,0.5)]">
      <div class="md:w-1/2 w-4/5 h-80 bg-white rounded-md shadow-md flex flex-col justify-around items-center">
        <span class="md:mx-0 mx-10">{{ prompt }}</span>
        <div class="flex flex-row justify-center items-center gap-x-10">
          <button :class="action == 'Delete' ? 'bg-red-500' : '' " @click="handleChoice(action.toLowerCase().toString())">{{ action }}</button>
          <button @click="handleChoice(action2.toLowerCase().toString())" v-if="action2">{{ action2 }}</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
const props = defineProps({
  action: {
    type: String,
    required: true
  }, 
  action2: {
    type: String
  },
  prompt: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['modal-confirmation'])

function handleChoice(choice: string) {
  emits('modal-confirmation', choice);
}
</script>

<style>

</style>