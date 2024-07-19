<template>
  <div class="w-full h-full py-4 px-16 overflow-y-auto">
    <table v-if="data" class="w-full border-separate border-spacing-y-10">
      <tr v-for="(deck, idx) in data" class="rounded-md shadow-[0_-2px_6px_-1px_rgba(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.1)]">
        <td class="px-10 py-6">
          <span class="text-2xl">
            {{ deck.name }}
          </span>
          <div class="mt-2 w-1/2 flex flex-row overflow-x-auto gap-2">
            <ReusableTag v-for="tag in deck.tags" :tag="tag.toString()" />
          </div>
        </td>
        <td v-if="type == 'teacher'">
          <div class="mx-2 px-1 py-0.5 bg-customPrimary-100 inline-block rounded-md"
          @click="$emit('edit-deck', deck.deckId)">
            <Icon name="i-material-symbols:edit-outline" class="w-7 h-7 cursor-pointer text-slate-700"/>
          </div>
          <div class="mx-2 px-1 py-0.5 bg-customPrimary-100 inline-block rounded-md"
          @click="$emit('delete-deck', deck.deckId)">
            <Icon name="i-material-symbols:delete-outline" class="w-7 h-7 cursor-pointer text-slate-700"/>
          </div>
        </td>
        <td v-else>
          <div class="mx-2 px-1 py-0.5 bg-customPrimary-100 inline-block rounded-md"
          @click="$emit('study-deck', deck.deckId)">
            <Icon name="i-material-symbols:play-arrow" class="w-7 h-7 cursor-pointer text-slate-700"/>
          </div>
        </td>
      </tr>
    </table>
    <div v-else>
      No data
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  data: {
    type: Array as PropType<Array<personalizedDeck>>,
    default: ()=> [],
  }
})
const dataLength = computed(()=> props.data.length)
const type = useCookie('type')

</script>

<style>

</style>