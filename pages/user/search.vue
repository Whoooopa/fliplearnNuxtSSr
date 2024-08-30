<template>
  <div class="w-screen md:h-screen h-h-[calc(100vh-5rem)] flex flex-row bg-white">
    <div class="w-48 h-full flex-col pt-5 bg-customPrimary-50 md:flex hidden">
      <span class="pl-8 text-2xl font-bold text-slate-700">Filter</span>
      <div class="border-b-[0.5px] border-b-slate-500 w-5/6 self-center my-4"></div>
      <div v-if="status != 'pending'">
        <div v-for="(tag, index) in selectedTags" class="w-full flex justify-between px-4 my-1">
          <label :for="`${index}`">
            {{ tag.name }}
          </label>
          <input type="checkbox" :id="`${index}`" v-model="tag.selected"/>
        </div>
      </div>
      <div v-else>
        <div class="w-5/6 h-6 mx-auto my-1 flex flex-row justify-between" v-for="s in 10">
          <USkeleton class="w-3/4 h-6" />
          <USkeleton class="w-8 h-6" />
        </div>
      </div>
    </div>
    <div class="w-full h-[calc(100vh-10rem)] flex-col">
      <div class="w-full h-20 bg-customPrimary-300 flex items-center px-8">
        <UInput class="w-full"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        v-model="inputQuery"
        > 
          <template #trailing>
            <div class="md:w-20 w-28 h-full flex flex-row justify-evenly bg-accent -mr-[0.60rem] rounded-r-md">
              <Icon name="i-mdi:magnify" class="w-8 h-8 text-white" @click="handleSearch"/>
              <div class="border-r-2 border-r-softbackground cursor-pointer">
              </div>
              <div class="md:hidden">
                <Icon name="i-material-symbols:filter-alt-outline" class="w-8 h-8 text-white cursor-pointer" @click="modalFilter = ! modalFilter"/>
              </div>
              <div class="md:hidden border-r-2 border-r-softbackground cursor-pointer">
              </div>
              <Icon name="i-material-symbols:close" class="w-8 h-8 text-white cursor-pointer" @click="inputQuery = ''"/>
            </div>
            </template>
        </UInput>
      </div>
      <div class="w-full h-[calc(100vh-10rem)] flex flex-col p-6 overflow-y-auto gap-6" v-if="decks?.length">
        <Deck v-for="deck in decks" :key="deck.id"
        :id="deck.id"
        :owner="deck.owner"
        :name="deck.name"
        :tags="deck.tags"/>
      </div>
    </div>
    <Teleport to="body" v-if="modalFilter">
      <div class="fixed bottom-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.3)] z-50  flex justify-center items-end">
        <div class="w-full h-5/6 bg-customPrimary-50 flex-col pt-5 rounded-md relative">
          <Icon name="i-material-symbols:close" class="absolute top-4 right-4 w-8 h-8 text-black cursor-pointer" @click="modalFilter = false"/>
          <span class="pl-8 text-2xl font-bold text-slate-700">Filter</span>
          <div class="border-b-[0.5px] border-b-slate-500 w-11/12 self-center my-4 mx-auto"></div>
          <div v-if="status != 'pending'" class="overflow-y-auto h-2/3">
            <div v-for="(tag, index) in selectedTags" class="w-full flex justify-between px-4 my-1">
              <label :for="`${index}`">
                {{ tag.name }}
              </label>
              <input type="checkbox" :id="`${index}`" v-model="tag.selected"/>
            </div>
          </div>
          <div v-else>
            <div class="w-5/6 h-6 mx-auto my-1 flex flex-row justify-between" v-for="s in 10">
              <USkeleton class="w-3/4 h-6" />
              <USkeleton class="w-8 h-6" />
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
let tagsArray: string[] = [];
if(route.query.tags){
    const tags = decodeURIComponent(route.query.tags.toString());
    tagsArray = tags.split(',')
}
const { data: tags, status } = await useFetch<string>('/api/user/tags');
const selectedTags = reactive(Object.entries(tags.value!).map(([index, value]) => {
  let exist = false;
  if(tagsArray.length) {
    if(tagsArray.indexOf(value) > -1) {
      exist = true;
    }
  }
  return { name: value, selected: exist };
}));


const decks = ref<deck[]>();
async function searchDecks() {
  decks.value = await $fetch('/api/user/decks',
    {
      query: route.query
    }
  )
  console.log(decks)
}

callOnce(()=> searchDecks())

const inputQuery = ref('');
const router = useRouter();

async function handleSearch() {
  const submissionTags = toRaw(selectedTags).filter((tag)=> tag.selected).map((tag)=> tag.name);
  if(inputQuery.value) {
    const queryTags = encodeURIComponent(submissionTags.join(','));
    
    if(queryTags)
    router.push({ query: { term: inputQuery.value, tags: queryTags } });
    else 
    router.push({ query: { term: inputQuery.value } });
  } else if(submissionTags.length) {
    
    const queryTags = encodeURIComponent(submissionTags.join(','));
    router.push({ query: { tags: queryTags } });
  } else {
    router.push('');
  }
}

onMounted(()=>{
  console.log('called on Mounted')
  watch(()=> route.query,
  (newValue, oldValue)=> {
    console.log('searching')
    searchDecks()
  }
)

  watch(selectedTags,
    (newValue, oldValue)=> {
      handleSearch()
    },
    { deep: true }
  )
})

const modalFilter = ref(false);

</script>

<style>

</style>