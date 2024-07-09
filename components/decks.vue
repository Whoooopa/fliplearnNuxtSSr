<template>
  <div class="w-full h-full py-4 px-16 overflow-y-auto">
    <table v-if="data" class="w-full">
      <tr v-for="deck in data" class="border-t-[1px] border-t-slate-500 h-8" >
        <td class="px-2 py-5">
          <span class="text-2xl">
            {{ deck.name }}
          </span>
          <div class="mt-2 w-1/2 flex flex-row overflow-x-auto gap-2">
            <ReusableTag v-for="tag in deck.tags" :tag="tag.toString()" />
          </div>
        </td>
        <td>
          <div class="mx-2 px-1 py-0.5 bg-accent inline-block rounded-md"
          @click="$emit('edit-deck', deck.deckId)">
            <Icon name="i-material-symbols:edit-outline" class="w-8 h-8 cursor-pointer"/>
          </div>
          <div class="mx-2 px-1 py-0.5 bg-accent inline-block rounded-md"
          @click="$emit('delete-deck', deck.deckId)">
            <Icon name="i-material-symbols:delete-outline" class="w-8 h-8 cursor-pointer"/>
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
defineProps({
  data: {
    type: Array as PropType<Array<personalizedDeck>>,
    default: ()=> [],
  }
})

</script>

<style>

</style>