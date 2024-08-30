<template>
  <div class="md:w-20 md:h-screen w-screen h-20 bg-accent border-r-4 border-r-customPrimary flex md:flex-col items-center md:justify-start justify-end md:px-0 px-10 py-10 gap-5">
    <div v-for="link in type =='teacher' ? [...teacherLinks,...commonLinks]: [...studentLinks,...commonLinks]">
      <NuxtLink :to="link.to" v-if="link.to" class="p-2 rounded-md relative userlink md:block hidden" :class="link.to === route.path ? 'useractive': ''">
        <Icon :name="link.iconUri" class="w-8 h-8 text-white" />
        <Icon :name="link.secondIconUri" class="w-4 h-4 text-white absolute top-[55%] left-[55%]" 
        v-if="link.secondIconUri" :class="link.to === route.path ? 'useractive': 'bg-accent'"/>
      </NuxtLink>
      <div v-else class="p-2 rounded-md hover:bg-customPrimary-600 hover:cursor-pointer md:block hidden" @click="handleLogout">
        <Icon :name="link.iconUri" class="w-7 h-7 text-white" />
      </div>
    </div>
    <div class="md:hidden block">
      <Transition name="fade" appear v-if="!menuOpen">
        <Icon name="i-material-symbols:menu" class="w-8 h-8" @click="menuOpen = !menuOpen"/>
      </Transition>
      
      <Transition name="fade" appear v-else>
        <Icon name="i-material-symbols-light:close-rounded" class="w-8 h-8" @click="closeMenu"/>
      </Transition>
      <Teleport to="body">
        <Transition name="fade" appear v-if="menuOpen">
          <div class="flex flex-col items-center w-screen py-3 z-50 fixed top-[3.75rem] bg-customPrimary-100">
            <NuxtLink v-for="link in type =='teacher' ? [...teacherLinks,...commonLinks]: [...studentLinks,...commonLinks]" :to='`${link.to}`' class="link px-2 py-3 rounded-md w-4/5 text-center" :class=" link.active?.value ? 'active': ''" @click="closeMenu(link.name)">
              {{ link.name }}
            </NuxtLink>
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<script lang="ts" setup>
const publicStore = usePublicStore();
var type = useCookie('type');
const menuOpen = ref(false);

function closeMenu(name: string) {
  if(name == "Log Out") handleLogout();
  menuOpen.value = false;
}
const router = useRouter();
const route = useRoute();
const path = computed(()=> route.path)
async function handleLogout(){
  await publicStore.logout();
  router.push('/login');
}

const isPath = (link: string):boolean => {
  return route.path === link
}
const teacherLinks = [
  {
    to: '/teacher',
    iconUri: 'i-ph:cards-three',
    name: 'Home',
		active: computed(()=> isPath('/teacher'))
  },
  {
    to: '/teacher/createdeck',
    iconUri: 'i-ph:cards-three',
    secondIconUri: 'i-material-symbols:add',
    name: 'Create Deck',
		active: computed(()=> isPath('/teacher/createdeck'))
  },
  {
    to: '/teacher/createcard',
    iconUri: 'i-material-symbols:splitscreen-portrait-rounded', //https://icones.js.org/collection/all?s=card+potrait
    secondIconUri: 'i-material-symbols:add',
    name: 'Create Card',
		active: computed(()=> isPath('/teacher/createcard'))
  }
]
const studentLinks = [
  {
    to: '/student',
    iconUri: 'i-ph:cards-three',
    name: 'Home',
		active: computed(()=> isPath('/student'))
  }
]

const commonLinks = [
  {
    to: '/user/search',
    iconUri: 'i-mdi:magnify',
    name: 'Search',
		active: computed(()=> isPath('/user/search'))
  },
  {
    to: '/user/profile',
    iconUri: 'i-material-symbols:account-circle-full',
    name: 'Profile',
		active: computed(()=> isPath('/user/profile'))
  },
  {
    iconUri: 'i-hugeicons:logout-04',
    name: 'Log Out'
  },
]

watch(path, 
  (newValue, oldValue)=>{
    console.log(type);
    type = useCookie('type');
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

@media (hover: hover), (-ms-high-contrast:none) {

  .link {
    background-color: var(--secondary);
    transition: background-color 1000ms linear;
  }

  .link:hover {
    background-color: var(--lightersecond);
  }

}

.active {
  background-color: var(--lightersecond);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>