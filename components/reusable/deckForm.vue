<template>
  <div class="flex flex-row h-5/6">
    <div class="w-1/2 h-full flex flex-col justify-center gap-16 ml-20">
      <div class="flex flex-col gap-5 mt-24">
        <label for="name" class="text-2xl">Choose a name for your deck :</label>
        <UInput id="name" class="w-80 rounded-md" size="xl" v-model="deckName" />
        <span aria-live="polite" aria-atomic="true" class="text-red-600" v-if="!deckLength && errors && !!errors[0].error.length">
          {{ errors[0].error }}
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
        <span aria-live="polite" aria-atomic="true" class="text-red-600" v-if="!tagLength && errors && !!errors[1].error.length">
          {{ errors[1].error }}
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
    <slot />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  prevDeckName: String,
  prevTags: Array<String>,
  errors: null as null || Array<{ field: string, error: string }> 
})

// this component is rendered after parent onMounted finish on editDeck/[id]
// so props value is populated and can be directly assigned to ref
const tagName = ref('');
const deckName = ref(props.prevDeckName ?? '');

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
  sendDeckFormChange();
}


const handleAddTag = () => {
  selectedTags.tags.push({name : tagName.value, selected:true })
  sendDeckFormChange();
}

const deckLength = computed(()=> deckName.value.length);
const tagLength = computed(()=> selectedTags.tags.length);

const emit = defineEmits(['deck-form-change']);

const sendDeckFormChange = () => {
  emit('deck-form-change', {
    deckName: deckName.value,
    tags: selectedTags.tags
  })
}

watch(deckName, 
  (newValue, oldValue) => {
    sendDeckFormChange()
  }
)

onMounted(()=>{// need to put this onMounted, otherwise sendDeckFormChange(emitting data) in toggleActive error 
  props.prevTags?.forEach((tagName) => {
  const existingTag = tags.tags.find(t => t.name == tagName);
      if (existingTag) {
        toggleActive(existingTag)
      } else {
        const newTag = { name: tagName.toString(), selected: false }
        toggleActive(newTag);
        tags.tags.push(newTag);
      }
})
})
</script>

<style>

</style>