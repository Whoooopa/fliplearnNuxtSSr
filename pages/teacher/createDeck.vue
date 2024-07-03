<template>
  <form class="flex flex-col h-screen w-screen justify-center items-center" @submit.prevent="createDeck">
    <div class="w-5/6 h-5/6 rounded md bg-white shadow-md">

      <div class="flex flex-row h-5/6">
        <div class="w-1/2 h-full flex flex-col justify-center gap-16 ml-20">
          <div class="flex flex-col gap-5 mt-24">
            <label for="name" class="text-2xl">Choose a name for your deck :</label>
            <UInput id="name" class="w-80 rounded-md" size="xl" v-model="deckName" />
            <span aria-live="polite" aria-atomic="true" class="text-red-600" v-if="!deckLength && !!errors[0].error.value.length">
              {{ errors[0].error.value }}
            </span>
          </div>
          <div class="flex flex-col gap-5">
            <label for="tag" class="text-2xl">Create a new tag :</label>
            <UInput id="tag" class="w-80 rounded-md" size="xl" v-model="tagName"
            :ui="{ icon: { trailing: { pointer: '' } } }">
              <template #trailing>
                <Icon name="i-material-symbols:add" class="w-8 h-8" @click="handleAddTag" />
              </template>
            </UInput>
            <span aria-live="polite" aria-atomic="true" class="text-red-600" v-if="!tagLength && !!errors[1].error.value.length">
              {{ errors[1].error.value }}
            </span>
          </div>
          <div class="w-80 h-40 rounded-md flex flex-row flex-wrap gap-x-10 overflow-y-auto">
            <div v-for="tag in selectedTags.tags" class="h-10 flex justify-center items-center px-3 rounded-md cursor-pointer my-2"
            @click="toggleActive(tag)" :class="tag.selected? 'bg-tagTosca': 'bg-softshade'">
              <span>{{ tag.name }}</span>
            </div>
          </div>
        </div>
        <div class="w-1/2 h-full flex flex-col gap-12 justify-center">
          <div class="text-2xl">Browse available tags</div>
          <div class="w-3/4 h-80 bg-softbackground rounded-md flex flex-row flex-wrap gap-x-10 p-8 overflow-y-auto shadow-inner">
            <div v-for="tag in tags.tags" class="h-10 flex justify-center items-center px-3 rounded-md cursor-pointer my-2"
            @click="toggleActive(tag)" :class="tag.selected ? 'bg-tagTosca': 'bg-softshade'">
              <span>{{ tag.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full flex flex-col justify-center items-center gap-5">
        <div class="w-5/6 h-0.5 bg-slate-400"/>
        <button class="w-20 h-10 p-2" type="submit">Create</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
type tag = {
  name: string,
  selected: boolean
}

const tagName = ref('');
const deckName = ref('');

const handleAddTag = () => {
  console.log('yes')
  selectedTags.tags.push({name : tagName.value, selected:true })
}

const tags = reactive({
  tags:[
  {
    name: '12th grade',
    selected: false,
  },
  {
    name: '11th grade',
    selected: false,
  },
  {
    name: 'Biology',
    selected: false,
  },
  {
    name: 'Chemistry',
    selected: false,
  },
  {
    name: 'Math',
    selected: false,
  },
  {
    name: 'English',
    selected: false,
  },
] as tag[]
})

const selectedTags = reactive({
  tags: [] as tag[]
})

const toggleActive = (selectedTag: tag) => {
  selectedTag.selected = !selectedTag.selected;
  if(selectedTag.selected){
    selectedTags.tags.push(selectedTag);
  }
  else {
    const temp = selectedTags.tags.filter((selectedTag)=>{ return selectedTag.selected});
    selectedTags.tags = temp;
  }
}

const errors = [
 {
  field: 'deck',
  error: ref('')
 }, 
 {
  field: 'tags',
  error: ref('')
 }, 
]
const deckLength = computed(()=> deckName.value.length);
const tagLength = computed(()=> selectedTags.tags.length);

async function createDeck(){

      if(deckLength.value == 0) {
        errors[0].error.value = "Deck name cannot be empty"
        return;
      }
      errors[0].error.value = ""
      if(tagLength.value == 0) {
        errors[1].error.value = "Add at least one tag first"
        return;
      }
      errors[1].error.value = ""

      const submissionData = new FormData();
      const submissionTags = selectedTags.tags.map((tag)=>{ return tag['name']});
      submissionData.append('deckName', deckName.value);
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