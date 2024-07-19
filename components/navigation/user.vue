<template>
  <div class="w-20 bg-accent border-r-4 border-r-customPrimary h-screen flex flex-col items-center py-10 gap-5">
    <div v-for="link in type =='teacher' ? [...teacherLinks,...commonLinks]: [...studentLinks,...commonLinks]">
      <NuxtLink :to="link.to" v-if="link.to" class="p-2 rounded-md relative userlink" :class="link.to === route.path ? 'useractive': ''">
        <Icon :name="link.iconUri" class="w-8 h-8 text-white " />
        <Icon :name="link.secondIconUri" class="w-4 h-4 text-white absolute top-[55%] left-[55%]" 
        v-if="link.secondIconUri" :class="link.to === route.path ? 'useractive': 'bg-accent'"/>
      </NuxtLink>
      <div v-else class="p-2 rounded-md hover:bg-customPrimary-600 hover:cursor-pointer" @click="handleLogout">
        <Icon :name="link.iconUri" class="w-7 h-7 text-white " />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const publicStore = usePublicStore();
const type = useCookie('type');
// console.log(type);
const teacherLinks = [
  {
    to: '/teacher',
    iconUri: 'i-ph:cards-three'
  },
  {
    to: '/teacher/createdeck',
    iconUri: 'i-ph:cards-three',
    secondIconUri: 'i-material-symbols:add'
  },
  {
    to: '/teacher/createcard',
    iconUri: 'i-material-symbols:splitscreen-portrait-rounded', //https://icones.js.org/collection/all?s=card+potrait
    secondIconUri: 'i-material-symbols:add'
  }
]
const studentLinks = [
  {
    to: '/student',
    iconUri: 'i-ph:cards-three'
  }
]

const commonLinks = [
  {
    to: '/user/search',
    iconUri: 'i-mdi:magnify'
  },
  {
    to: '/user/profile',
    iconUri: 'i-material-symbols:account-circle-full'
  },
  {
    iconUri: 'i-hugeicons:logout-04'
  },
]

const router = useRouter();
const route = useRoute();
const path = computed(()=> route.path)
async function handleLogout(){
  await publicStore.logout();
  router.push('/login');
}

watch(path, 
  (newValue, oldValue)=>{
    
  },
  {
    deep: true
  }
)
</script>

<style>

.userlink:hover > *, .userlink:hover, .useractive {
  background-color: var(--customPrimary-600);
  border-radius: 0.375rem;
}

</style>