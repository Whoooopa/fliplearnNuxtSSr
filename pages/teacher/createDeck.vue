<template>
  <form class="flex flex-col h-screen w-screen justify-center items-center" @submit.prevent="createDeck">
    <ReusableCardlayout>
      <ReusableDeckForm @deck-form-change="updateDeckData"
      :errors="errors">
        <button class="w-20 h-10 p-2" type="submit">Create</button>
      </ReusableDeckForm>
    </ReusableCardlayout>
  </form>
</template>

<script lang="ts" setup>
const errors = reactive([
  { field: 'deck', error: '' },
  { field: 'tags', error: '' }
]);

const deckData = reactive({
  name: '',
  tags: [] as tag[]
})

const updateDeckData = (data: { deckName: string, tags: Array<tag> }) => {
  deckData.name = data.deckName;
  deckData.tags = toRaw(data.tags)
}

async function createDeck(){

      if(deckData.name.length == 0) {
        errors[0].error = "Deck name cannot be empty"
        console.log('nam is empty')
        return;
      }
      errors[0].error = ""
      if(deckData.tags.length == 0) {
        errors[1].error = "Add at least one tag first"
        console.log('tag is empty')
        return;
      }
      errors[1].error = ""

      const submissionData = new FormData();
      const submissionTags = deckData.tags.map((tag)=>{ return tag['name']});
      submissionData.append('deckName', deckData.name);
      submissionData.append('tags', JSON.stringify(submissionTags));
      try {
        const res = await fetch('/api/teacher/createdeck', {
          method: "POST",
          body: submissionData
        })
        console.log(res);
      } 
      catch (e){
        console.log(e);
      }
    }
</script>

<style>

</style>